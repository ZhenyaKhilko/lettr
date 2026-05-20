import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Letter } from "../model/types";
import {
  clearLettersAsync,
  loadLettersAsync,
  saveLetterAsync,
} from "./storage";

type IDBEventHandler = ((this: IDBRequest, ev: Event) => void) | null;

type MockRequest<TResult = undefined> = {
  onsuccess: IDBEventHandler;
  onerror: IDBEventHandler;
  result?: TResult;
};

function createRequest<TResult = undefined>(result?: TResult): MockRequest<TResult> {
  const request: MockRequest<TResult> = {
    onsuccess: null,
    onerror: null,
    result,
  };

  setTimeout(() => {
    request.onsuccess?.call(request as unknown as IDBRequest, new Event("success"));
  }, 0);

  return request;
}

let storeData: Record<string, unknown> = {};

const mockIndexedDB: Pick<IDBFactory, "open"> = {
  open: () => {
    const request: MockRequest<IDBDatabase> & {
      onupgradeneeded: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => void) | null;
      result: IDBDatabase;
    } = {
      onerror: null,
      onsuccess: null,
      onupgradeneeded: null,
      result: {
        objectStoreNames: {
          contains: () => true,
        },
        transaction: () => ({
          objectStore: () => ({
            getAll: () => createRequest(Object.values(storeData)),
            put: (item: Letter) => {
              storeData[item.id] = item;
              return createRequest();
            },
            delete: (id: string) => {
              delete storeData[id];
              return createRequest();
            },
            clear: () => {
              storeData = {};
              return createRequest();
            },
          }),
        }),
      } as unknown as IDBDatabase,
    };

    setTimeout(() => {
      request.onsuccess?.call(request as unknown as IDBOpenDBRequest, new Event("success"));
    }, 0);

    return request as unknown as IDBOpenDBRequest;
  },
};

describe("letter storage", () => {
  beforeAll(() => {
    vi.stubGlobal("indexedDB", mockIndexedDB as IDBFactory);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(async () => {
    await clearLettersAsync();
  });

  it("restores valid letters from IndexedDB", async () => {
    const letter: Letter = {
      id: "1",
      company: "Acme",
      jobTitle: "Frontend Engineer",
      skills: "React",
      details: "Details",
      content: "Letter body",
      createdAt: 100,
      updatedAt: 200,
    };

    await saveLetterAsync(letter);
    const loaded = await loadLettersAsync();
    expect(loaded).toEqual([letter]);
  });

  it("filters out invalid letters from IndexedDB results", async () => {
    const invalidRecord: { id: string; company: number } = {
      id: "invalid",
      company: 123,
    };
    storeData["invalid"] = invalidRecord;

    const loaded = await loadLettersAsync();
    expect(loaded).toEqual([]);
  });
});
