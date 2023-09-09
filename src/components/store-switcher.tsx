import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/core/lib/utils";
import { useStoreModal } from "@/hooks";
import type { loader } from "@/routes/resources.stores";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

const formatLabel = (label: string | undefined) =>
  label && label.length > 16 ? label.substring(0, 16).concat("...") : label;

export function StoreSwitcher(props: PopoverTriggerProps) {
  const fetcher = useFetcher<typeof loader>();

  const navigate = useNavigate();
  const params = useParams();
  const storeModal = useStoreModal();

  useEffect(() => {
    fetcher.submit({}, { method: "GET", action: "/resources/stores" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stores = fetcher.data?.stores ?? [];

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    navigate(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", props.className)}
        >
          {formatLabel(currentStore?.label)}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          <StoreIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {formatLabel(store.label)}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
