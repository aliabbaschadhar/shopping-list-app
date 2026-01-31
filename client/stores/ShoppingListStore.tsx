import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, Value } from "tinybase/with-schemas";
import { useCreateClientPersistersAndStart } from "./persistence/useCreateClientPersisterAndStart";
import { useCreateServerSyncronizationAndStart } from "./syncronization/useCreateServerSyncronizationAndStart";
import { useUserIdAndNickname } from "@/hooks/useNickname";

const STORE_ID_PREFIX = "shoppingListStore-";

const VALUES_SCHEMA = {
  listId: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  emoji: { type: "string" },
  color: { type: "string" },
  createAt: { type: "string" },
  updatedAt: { type: "string" },
} as const;

const TABLES_SCHEMA = {
  products: {
    id: { type: "string" },
    name: { type: "string" },
    quantity: { type: "number" },
    unit: { type: "string" },
    isPurchased: { type: "boolean" },
    category: { type: "string" },
    createdBy: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  } as const,

  collaborators: {
    nickname: { type: "string" },
  } as const,

} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type ShoppingListValueId = keyof typeof VALUES_SCHEMA;
type ShoppingListProductCellId = keyof (typeof TABLES_SCHEMA)["products"];

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideRelationships,
  useProvideStore,
  useRowCount,
  useSetCellCallback,
  useSetValueCallback,
  useSortedRowIds,
  useStore,
  useCreateRelationships,
  useTable,
  useValue,
  useValuesListener,
} = UiReact as UiReact.WithSchemas<Schemas>;

const useStoreId = (listId: string) => STORE_ID_PREFIX + listId;

// Returns a pair of 1) a property of the shopping lists list, 
// and 2) a callback to delete a shopping list by ID.
export const useShoppingListValue = <ValueId extends ShoppingListValueId>(
  listId: string,
  valueId: ValueId
): [
    Value<Schemas[1], ValueId> | undefined,
    (value: Value<Schemas[1], ValueId>) => void
  ] => [
    useValue(valueId, useStoreId(listId)),
    useSetValueCallback(
      valueId,
      (value: Value<Schemas[1], ValueId>) => value,
      [],
      useStoreId(listId)
    ),
  ];

// Return the number of products in a shopping list.
export const useShoppingListProductCount = (listId: string) =>
  useRowCount("products", useStoreId(listId));

// Return the nicknames of people involved in a shopping list.
export const useShoppingListCollaboratorNicknames = (listId: string) =>
  Object.entries(useTable("collaborators", useStoreId(listId))).map(
    ([, { nickname }]) => nickname
  );
// Create, persist, and sync a store containing the shopping list and its products.
export default function ShoppingListStore({
  listId,
  initialContentJson
}: {
  listId: string;
  initialContentJson?: string;
}) {
  const storeId = useStoreId(listId);
  const { userId, nickname } = useUserIdAndNickname();
  const store = useCreateMergeableStore(
    () => createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  // Persist store (with initial content if it hasn't been saved before)
  // ensure the curent user is added as collaborator.

  useCreateClientPersistersAndStart(storeId, store, initialContentJson, () =>
    store.setRow("collaborators", userId, { nickname })
  );

  useCreateServerSyncronizationAndStart(storeId, store);

  useProvideStore(storeId, store); // It allows us to keep adding more stores as much the user needs.

  return null;
}