import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { format } from "date-fns";
import { useGetPrescricoesPorData } from "@/api/prescricao/hooks";
import { Separator } from "../ui/separator";

export default function CalendarMedicine() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: prescricoes } = useGetPrescricoesPorData(
    date ? format(date, "yyyy-MM-dd") : undefined
  );

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
            <Separator className="my-2"/>
            <p>Prescrições:</p>
            {
              prescricoes && prescricoes.length > 0 ? (
                <ul>
                  {prescricoes.map((prescricao) => (
                    <li key={prescricao.id}>
                      <p>{prescricao.id}. {prescricao.remedio.nome} - Tomar {prescricao.frequencia} vezes ao dia</p>
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
