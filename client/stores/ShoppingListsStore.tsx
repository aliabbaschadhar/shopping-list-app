import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { useUser } from "@clerk/clerk-expo";
import { useCreateClientPersistersAndStart } from "./persistence/useCreateClientPersisterAndStart";
import { useCreateServerSyncronizationAndStart } from "./syncronization/useCreateServerSyncronizationAndStart";
import ShoppingListStore from "./ShoppingListStore";
import { useCallback } from "react";
import { randomUUID } from "expo-crypto";

const STORE_ID_PREFIX = "shoppingListsStore-";

const TABLES_SCHEMA = {
  lists: {
    id: { type: "string" },
    initialContentJson: { type: "string" },
  },
} as const;

const {
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user?.id;

// Returns a callback that adds a new shopping list to the store.
export const useAddShoppingListCallback = () => {
  const store = useStore(useStoreId());

  return useCallback((
    name: string, description: string, emoji: string, color: string
  ) => {
    const id = randomUUID();
    store?.setRow("lists", id, {
      id,
      initialContentJson: JSON.stringify([
        {},
        {
          id,
          name,
          description,
          emoji,
          color,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ])
    })
    return id;
  }, [store])
}

// Returns the IDs of all shopping lists for the current user.
export const useShoppingListIds = () => useRowIds("lists", useStoreId());

// Returns a callback which deletes a shopping list from the store.
export const useDelShoppingListCallback = (id: string) => useDelRowCallback("lists", id, useStoreId());

export default function ShoppingListsStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() => createMergeableStore().setTablesSchema(TABLES_SCHEMA));

  useCreateClientPersistersAndStart(storeId, store);
  useCreateServerSyncronizationAndStart(storeId, store);
  useProvideStore(storeId, store);
  const currentUserLists = useTable("lists", storeId);

  return (
    Object.entries(currentUserLists).map(
      ([listId, { initialContentJson }]) => (
        <ShoppingListStore
          key={listId}
          listId={listId}
          initialContentJson={initialContentJson}
        />
      )
    )
  )
}