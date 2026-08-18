import {
  Alert,
  Button,
  Divider,
  Modal,
  ModalContent,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";
import { useAddShoppingListItemMutation } from "../services/shoppinglist/queries";

interface ComponentProps {
  opened: boolean;
  onClose: () => void;
  weekPlanId: number;
}

export const AddShoppingListItemModal = ({
  opened,
  onClose,
  weekPlanId,
}: ComponentProps) => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addShoppingListItemMutation = useAddShoppingListItemMutation(weekPlanId);

  const resetForm = () => {
    setName("");
    setUnit("");
    setQuantity("");
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedName = name.trim();
    const trimmedUnit = unit.trim();
    const normalizedQuantity = quantity.replace(",", ".").trim();
    const parsedQuantity = Number(normalizedQuantity);

    setErrorMessage(null);

    if (!trimmedName) {
      setErrorMessage("Fyll i ingrediensens namn.");
      return;
    }

    if (!trimmedUnit) {
      setErrorMessage("Fyll i en enhet.");
      return;
    }

    if (!normalizedQuantity || Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setErrorMessage("Fyll i en giltig mängd större än 0.");
      return;
    }

    addShoppingListItemMutation.mutate(
      {
        name: trimmedName,
        unit: trimmedUnit,
        quantity: parsedQuantity,
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          setErrorMessage(
            error.message || "Kunde inte lägga till ingrediensen.",
          );
        },
      },
    );
  };

  return (
    <Modal.Root opened={opened} onClose={handleClose} centered>
      <Modal.Overlay />

      <ModalContent>
        <Modal.Header>
          <Modal.Title>
            <Text size="lg" fw={600}>
              Lägg till ingrediens
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        <Divider my="sm" />

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Namn"
                placeholder="Butter"
                size="md"
                radius="lg"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />

              <TextInput
                label="Enhet"
                placeholder="g"
                size="md"
                radius="lg"
                value={unit}
                onChange={(event) => setUnit(event.currentTarget.value)}
              />

              <TextInput
                label="Mängd"
                placeholder="50"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                size="md"
                radius="lg"
                value={quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
              />

              {errorMessage ? (
                <Alert color="danger">{errorMessage}</Alert>
              ) : null}

              <Button
                type="submit"
                loading={addShoppingListItemMutation.isPending}
                leftSection={<IconDeviceFloppy size={16} />}
              >
                Spara ingrediens
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </ModalContent>
    </Modal.Root>
  );
};
