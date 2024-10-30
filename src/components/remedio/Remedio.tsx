import { PlusIcon, PencilIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { NovoRemedioModal } from "./NovoRemedio";
import {
  useCreateRemedio,
  useGetRemedios,
  type IRemedioDto,
} from "@/api/remedio/hooks";
import { useToast } from "@/hooks/use-toast";

export default function Remedio() {
  const [isNovoRemedioModalOpen, setIsNovoRemedioModalOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: remedios,
    isPending: isPendingRemedios,
    isError: isErrorRemedios,
  } = useGetRemedios();

  const { mutateAsync: novoRemedio } = useCreateRemedio();

  const handleCriaNovoRemedio = async (formData: IRemedioDto) => {
    try {
      const dto = {
        nome: formData.nome,
        funcao: formData.funcao,
        dosagem: Number(formData.dosagem),
      };

      await novoRemedio(dto);
      toast({
        title: "Remédio criado com sucesso",
        description: "O remédio foi criado com sucesso!",
      });
      setIsNovoRemedioModalOpen(false);
    } catch (e) {
      toast({
        title: "Erro ao criar remédio",
        description: "Ocorreu um erro ao criar o remédio, tente novamente!",
      });
      console.error(e);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Remédios</CardTitle>
        <Button onClick={() => setIsNovoRemedioModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Novo Remédio
        </Button>
      </CardHeader>
      <CardContent>
        {isPendingRemedios ? (
          <div className="text-center">Carregando remédios...</div>
        ) : isErrorRemedios ? (
          <div className="text-center text-red-500">
            Erro ao carregar remédios. Por favor, tente novamente.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Dosagem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remedios &&
                remedios.map((remedio) => (
                  <TableRow key={remedio.id}>
                    <TableCell>{remedio.nome}</TableCell>
                    <TableCell>{remedio.funcao}</TableCell>
                    <TableCell>{remedio.dosagem}</TableCell>
                    <TableCell>
                      {remedio.status ? "Em estoque" : "Em falta"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => console.log("Editar")}
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <NovoRemedioModal
        isOpen={isNovoRemedioModalOpen}
        onClose={() => setIsNovoRemedioModalOpen(false)}
        onSubmit={handleCriaNovoRemedio}
      />
    </Card>
  );
}
