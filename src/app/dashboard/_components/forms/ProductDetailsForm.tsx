"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { productDetailsSchema } from "@/schemas/products";
import { createProduct } from "@/server/actions/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { url } from "inspector";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductDetailsForm = () => {
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
  });
  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    const data = await createProduct(values);
    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your website url</FormLabel>
                <FormControl>
                  <Input placeholder="enter url" {...field} />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the full path to the
                  sales page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
                  {...field}
                  className="min-h-20 resize-none"
                />
              </FormControl>
              <FormDescription>
                An optional description to help distinguish your product from
                other products
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductDetailsForm;
