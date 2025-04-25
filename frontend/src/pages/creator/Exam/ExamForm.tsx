import { DateFormat } from "@/common/DateFormat";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Zod validation schema
const examformSchema = z.object({
  examName: z.string().min(1, { message: "Exam name is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
  totalMarks: z.coerce.number().min(1, { message: "Total marks is required" }),
  numberOfQuestions: z.coerce.number().min(1, { message: "Question count is required" }),
  instructions: z.string().optional(),
  passingMarks: z.coerce.number().min(1, { message: "Passing marks is required" }),
});

export default function ExamForm({ onSubmit }: { onSubmit: (data: z.infer<typeof examformSchema>) => void }) {
  const { formatDate } = DateFormat();

  const form = useForm<z.infer<typeof examformSchema>>({
    resolver: zodResolver(examformSchema),
    defaultValues: {
      examName: "",
      subject: "",
      startDate: new Date(),
      endDate: new Date(),
      duration: 1,
      totalMarks: 1,
      numberOfQuestions: 1,
      instructions: "",
      passingMarks: 1,
    },
  });

  return (
    <div className="space-y-4 flex justify-center">
      <div className="bg-[#dfe0e2] p-3.5 w-[1200px] rounded-xl text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Exam Name */}
            <FormField
              control={form.control}
              name="examName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Exam Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? field.value.toLocaleDateString() : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0 z-50 bg-white border border-gray-200 shadow-lg rounded-md"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) field.onChange(date);
                        }}
                        initialFocus
                        className="text-black"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? field.value.toLocaleDateString() : "Select date"}
                          <CalendarIcon className="ml-auto h-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-full p-0 z-50 bg-white border border-gray-200 shadow-lg rounded-md"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) field.onChange(date);
                        }}
                        initialFocus
                        className="text-black"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (mins)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Marks */}
            <FormField
              control={form.control}
              name="totalMarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Marks</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Questions */}
            <FormField
              control={form.control}
              name="numberOfQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Passing Marks */}
            <FormField
              control={form.control}
              name="passingMarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passing Marks</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Instructions */}
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Input placeholder="Any notes or instructions..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
              Save & Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
