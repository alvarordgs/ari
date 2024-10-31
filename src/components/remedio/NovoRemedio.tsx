import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { IRemedioDto } from "@/api/remedio/hooks";

interface NovoRemedioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IRemedioDto) => void;
}

export function NovoRemedioModal({
  isOpen,
  onClose,
  onSubmit,
}: NovoRemedioModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRemedioDto>();

  const onSubmitForm = (data: IRemedioDto) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Remédio</DialogTitle>
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
                {...register("dosagem", { required: "Dosagem é obrigatória" })}
              />
              {errors.dosagem && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.dosagem.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
