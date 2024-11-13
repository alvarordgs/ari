import { CalendarIcon, PencilIcon } from "lucide-react";
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
import type { IPrescricaoFormData } from "./NovaPrescricao";
import { Controller, useForm } from "react-hook-form";
import { useEditPrescricao } from "@/api/prescricao/hooks";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import type { IPrescricaoResponse } from "@/api/prescricao";
import { useEffect, useState } from "react";

interface EditarPrescricaoProps {
  prescricao: IPrescricaoResponse;
  refetchPrescricoes: () => void;
  remedios?: { id: number; name: string }[];
}

export default function EditarPrescricao({
  prescricao,
  remedios,
  refetchPrescricoes,
}: EditarPrescricaoProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: atualizarPrescricao, isPending: isPendingAoAtualizarPrescricao } = useEditPrescricao();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPrescricaoFormData>({
    defaultValues: {
      remedio: prescricao.remedio.id,
      observacao: prescricao.observacao,
      dataFim: prescricao?.dt_fim ? new Date(prescricao.dt_fim) : undefined,
      dataInicio: prescricao.dt_inicio
        ? new Date(prescricao.dt_inicio)
        : undefined,
      frequencia: prescricao.frequencia,
    },
  });

  const onSubmitForm = (data: IPrescricaoFormData) => {
    handleEditarPrescricao(data);
  };

  const handleEditarPrescricao = async (formData: IPrescricaoFormData) => {
    const dto = {
      observacao: formData.observacao,
      id_remedio: formData.remedio,
      frequencia: formData.frequencia,
      dt_inicio: new Date(formData.dataInicio),
      dt_fim: formData.dataFim ? new Date(formData.dataFim) : null,
    };

    try {
      await atualizarPrescricao({ idPrescricao: prescricao.id, dto });
      toast({
        title: "Prescrição atualizada com sucesso",
        description: "A prescrição foi atualizada com sucesso!",
      });
      refetchPrescricoes();
      setOpen(false);
    } catch (e) {
      toast({
        title: "Erro ao atualizar prescrição",
        description: "Ocorreu um erro ao atualizar a prescrição, tente novamente!",
      });
      console.error(e);
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        remedio: prescricao.remedio.id,
        observacao: prescricao.observacao,
        dataFim: prescricao?.dt_fim ? new Date(prescricao.dt_fim) : undefined,
        dataInicio: prescricao.dt_inicio ? new Date(prescricao.dt_inicio) : undefined,
        frequencia: prescricao.frequencia,
      });
    }
  }, [open, prescricao, reset]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      {isPendingAoAtualizarPrescricao ? <div>Carregando...</div> : <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar prescrição</DialogTitle>
          <DialogDescription>
            Faça alterações na prescrição aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="remedio" className="text-right">
                Medicamento
              </Label>
              {remedios && (
                <Controller
                  name="remedio"
                  control={control}
                  rules={{ required: "Medicamento é obrigatório" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione um medicamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {remedios.map((med) => (
                          <SelectItem key={med.id} value={String(med.id)}>
                            {med.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {errors.remedio && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.remedio.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observacao" className="text-right">
                Observação
              </Label>
              <Textarea
                id="observacao"
                className="col-span-3"
                {...register("observacao")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataInicio" className="text-right">
                Data Início
              </Label>
              <Controller
                name="dataInicio"
                control={control}
                rules={{ required: "Data de início é obrigatória" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`col-span-3 ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.dataInicio && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.dataInicio.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataFim" className="text-right">
                Data Fim
              </Label>
              <Controller
                name="dataFim"
                control={control}
                rules={{ required: "Data de fim é obrigatória" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`col-span-3 ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.dataFim && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.dataFim.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequência
              </Label>
              <Input
                id="frequency"
                type="number"
                className="col-span-3"
                {...register("frequencia", {
                  required: "Frequência é obrigatória",
                })}
              />
              {errors.frequencia && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.frequencia.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>}
    </Dialog>
  );
}
