import { useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { format } from "date-fns";
import { useGetPrescricoesPorData } from "@/api/prescricao/hooks";

const calendarSchema = z.object({
  calendar: z.date(),
});

export default function CalendarMedicine() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: prescricoes } = useGetPrescricoesPorData(
    date ? format(date, "yyyy-MM-dd") : undefined
  );

  const form = useForm({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      calendar: new Date(),
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <form>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              {...form.register("calendar")}
            />
          </form>
          <div>
            {date ? (
              <h2 className="text-2xl font-semibold transition-all ease-in-out">
                {format(date, "dd/MM/yyyy")}
              </h2>
            ) : (
              <p>...</p>
            )}
            <p>Prescrições:</p>
            {
              prescricoes && prescricoes.length > 0 ? (
                <ul>
                  {prescricoes.map((prescricao) => (
                    <li key={prescricao.id}>
                      {prescricao.id}. {prescricao.remedio.nome} - Tomar {prescricao.frequencia} vezes ao dia
                    </li>
                  ))}
                </ul>
              ) : (<p>Não tem nenhum remédio para tomar nessa data.</p>)
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
