import type { IRemedioResponse } from "@/api/remedio";
import { useEditRemedio, type IRemedioDto } from "@/api/remedio/hooks";
import { useToast } from "@/hooks/use-toast";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditarRemedioProps {
  remedio: IRemedioResponse;
  refetchRemedios: () => void;
  remedios?: { id: number; name: string }[];
}

export default function EditarRemedio({
  remedio,
  refetchRemedios,
}: EditarRemedioProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: editarRemedio, isPending: isPendingAoAtualizarRemedio } =
    useEditRemedio();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRemedioDto>({
    defaultValues: {
      nome: remedio.nome,
      funcao: remedio.funcao,
      dosagem: remedio.dosagem,
    },
  });

  const onSubmitForm = (data: IRemedioDto) => {
    handleEditarRemedio(data);
  };

  const handleEditarRemedio = async (formData: IRemedioDto) => {
    try {
      const dto = {
        nome: formData.nome,
        funcao: formData.funcao,
        dosagem: Number(formData.dosagem),
      };

      await editarRemedio({ idRemedio: remedio.id, remedio: dto });
      toast({
        title: "Remédio atualizado com sucesso",
        description: "O remédio foi atualizado com sucesso!",
      });
      refetchRemedios();
      setOpen(false);
    } catch (e) {
      toast({
        title: "Erro ao atualizar remédio",
        description: "Ocorreu um erro ao atualizar o remédio, tente novamente!",
      });
      console.error(e);
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        nome: remedio.nome,
        funcao: remedio.funcao,
        dosagem: remedio.dosagem,
      });
    }
  }, [open, remedio, reset]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      {isPendingAoAtualizarRemedio ? (
        <div>Carregando...</div>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar remédio</DialogTitle>
            <DialogDescription>
              Faça alterações no remédio aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  className="col-span-3"
                  placeholder="Nome do remédio"
                  {...register("nome", { required: "Nome é obrigatório" })}
                />
                {errors.nome && (
                  <p className="col-span-3 col-start-2 text-sm text-red-500">
                    {errors.nome.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="funcao" className="text-right">
                  Função
                </Label>
                <Textarea
                  id="funcao"
                  className="col-span-3"
                  placeholder="Função do remédio"
                  {...register("funcao", { required: "Função é obrigatória" })}
                />
                {errors.funcao && (
                  <p className="col-span-3 col-start-2 text-sm text-red-500">
                    {errors.funcao.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosagem" className="text-right">
                  Dosagem
                </Label>
                <Input
                  id="dosagem"
                  type="number"
                  className="col-span-3"
                  placeholder="Em miligrama"
                  {...register("dosagem", {
                    required: "Dosagem é obrigatória",
                  })}
                />
                {errors.dosagem && (
                  <p className="col-span-3 col-start-2 text-sm text-red-500">
                    {errors.dosagem.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
