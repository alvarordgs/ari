import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { format } from "date-fns";
import { useGetPrescricoesPorData } from "@/api/prescricao/hooks";
import { Separator } from "../ui/separator";
import { Pill } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function CalendarioRemedios() {
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
          <div className="w-full">
            {date ? (
              <h2 className="text-2xl font-semibold transition-all ease-in-out">
                {format(date, "dd/MM/yyyy")}
              </h2>
            ) : (
              <p>...</p>
            )}
            <Separator className="my-2" />
            <h2 className="text-lg font-semibold mb-4">Prescrições:</h2>
            {prescricoes && prescricoes.length > 0 ? (
              <ul>
                {prescricoes.map((prescricao) => (
                  <Alert key={prescricao.id}>
                    <Pill className="h-4 w-4" />
                    <AlertTitle>{prescricao.remedio.nome}</AlertTitle>
                    <AlertDescription>
                      <p>Tomar {prescricao.frequencia} vezes ao dia</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </ul>
            ) : (
              <p>Não tem nenhum remédio para tomar nessa data.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
