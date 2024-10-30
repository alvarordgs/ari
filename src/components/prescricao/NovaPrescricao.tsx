import { useForm, Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface NovaPrescricaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPrescricaoFormData) => void;
  remedios?: { id: number; name: string }[];
}

export interface IPrescricaoFormData {
  remedio: number;
  observacao: string;
  dataInicio: Date;
  dataFim: Date;
  frequencia: number;
}

export function NovaPrescricaoModal({
  isOpen,
  onClose,
  onSubmit,
  remedios,
}: NovaPrescricaoModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPrescricaoFormData>();

  const onSubmitForm = (data: IPrescricaoFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Prescrição</DialogTitle>
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
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
