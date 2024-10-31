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
import {
  NovaPrescricaoModal,
  type IPrescricaoFormData,
} from "./NovaPrescricao";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreatePrescricao, useGetPrescricoes } from "@/api/prescricao/hooks";
import { useGetRemedios } from "@/api/remedio/hooks";

export default function Prescricao() {
  const [isNovaPrescricaoModalOpen, setIsNovaPrescricaoModalOpen] =
    useState(false);
  const { toast } = useToast();

  const { mutateAsync: novaPrescricao } = useCreatePrescricao();

  const {
    data: presricoes,
    isPending: isPendingPrescricoes,
    isError: isErrorPrescricoes,
    refetch: refetchPrescricoes,
  } = useGetPrescricoes();

  const {
    data: remedios,
    isPending: isPendingRemedios,
    isError: isErrorRemedios,
  } = useGetRemedios();

  const remediosOptions = remedios?.map((remedio) => ({
    id: remedio.id,
    name: remedio.nome,
  }));

  const handleCriarNovaPrescricao = async (formData: IPrescricaoFormData) => {
    const dto = {
      observacao: formData.observacao,
      id_remedio: formData.remedio,
      frequencia: formData.frequencia,
      dt_inicio: new Date(formData.dataInicio),
      dt_fim: formData.dataFim ? new Date(formData.dataFim) : null,
    };

    try {
      await novaPrescricao(dto);
      toast({
        title: "Prescrição criada com sucesso",
        description: "A prescrição foi criada com sucesso!",
      });
      setIsNovaPrescricaoModalOpen(false);
      refetchPrescricoes();
    } catch (e) {
      toast({
        title: "Erro ao criar prescrição",
        description: "Ocorreu um erro ao criar a prescrição, tente novamente!",
      });
      console.error(e);
    }
  };

  if (isPendingRemedios || isPendingPrescricoes) {
    return <div className="text-center">Carregando informações...</div>;
  }

  if (isErrorRemedios || isErrorPrescricoes) {
    return (
      <div className="text-center text-red-500">
        Erro ao carregar informações. Por favor, tente novamente.
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          Prescrições Médicas
        </CardTitle>
        <Button onClick={() => setIsNovaPrescricaoModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Nova Prescrição
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Medicamento</TableHead>
              <TableHead>Dosagem&#40;mg&#41;</TableHead>
              <TableHead>Frequência</TableHead>
              <TableHead>Data Inicio</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presricoes &&
              presricoes.map((prescricao) => (
                <TableRow key={prescricao.id}>
                  <TableCell>{prescricao.id}</TableCell>
                  <TableCell>{prescricao.remedio.nome}</TableCell>
                  <TableCell>{prescricao.remedio.dosagem}</TableCell>
                  <TableCell>{prescricao.frequencia}</TableCell>
                  <TableCell>
                    {new Date(prescricao.dt_inicio).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {prescricao.dt_fim
                      ? new Date(prescricao.dt_fim).toLocaleDateString("pt-BR")
                      : "Indefinido"}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => () => console.log()}>
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <NovaPrescricaoModal
        isOpen={isNovaPrescricaoModalOpen}
        onClose={() => setIsNovaPrescricaoModalOpen(false)}
        onSubmit={handleCriarNovaPrescricao}
        remedios={remediosOptions}
      />
    </Card>
  );
}
