import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CalendarMedicine() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Calendar />
          <div>
            <h2>Data Atual</h2>
            <p>Descrição</p>
            <ul>
              <li>
                <p>Remedio agendado para esse dia</p>
                <div>tag indicando se o remedio foi tomado ou não</div>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
