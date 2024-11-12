import { useGetMe } from "@/api/usuario/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";

export default function Perfil() {
  const { data, isPending, isError } = useGetMe();

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          <li>
            <label className="font-semibold text-sm">Nome:</label>
            <p>{data?.nome}</p>
          </li>
          <li>
            <label className="font-semibold text-sm">Email:</label>
            <p>{data?.email}</p>
          </li>
          <li>
            <label className="font-semibold text-sm">Data de Nascimento:</label>
            <p>
              {data?.dt_nascimento
                ? format(data.dt_nascimento, "dd/MM/yyyy")
                : "Não informada"}
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
