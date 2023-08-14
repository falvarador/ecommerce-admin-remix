import { useFetcher } from "@remix-run/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/remix";
import { Modal } from "~/components/ui/modal";
import { useStoreModal } from "~/hooks/use-store-modal";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const schema = z.object({
  name: z.string().min(3).max(255),
});

export function StoreModal() {
  const fetcher = useFetcher();
  const { userId } = useAuth();
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const { name } = values;

      if (!userId) {
        throw new Error("User not found.");
      }

      fetcher.submit({ userId, name }, { method: "POST" });
      toast.success("Store created successfully.");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={fetcher.state === "submitting"}
                          placeholder="E-Commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    disabled={fetcher.state === "submitting"}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={fetcher.state === "submitting"}
                    type="submit"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
