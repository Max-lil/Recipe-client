import {
  Alert,
  Button,
  Divider,
  FileInput,
  Modal,
  ModalContent,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";
import { useAddRecipeMutation } from "../services/recipes/queries";

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRecipeModal = ({ isOpen, onClose }: ComponentProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addRecipeMutation = useAddRecipeMutation();

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();

    setErrorMessage(null);

    if (!trimmedTitle) {
      setErrorMessage("Fyll i ett namn på receptet.");
      return;
    }

    const payload = trimmedUrl
      ? { title: trimmedTitle, url: trimmedUrl }
      : { title: trimmedTitle };

    addRecipeMutation.mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        setErrorMessage(error.message || "Kunde inte lägga till recept.");
      },
    });
  };

  return (
    <Modal.Root opened={isOpen} onClose={handleClose} centered>
      <Modal.Overlay />

      <ModalContent>
        <Modal.Header>
          <Modal.Title>
            <Text size="lg" fw={600}>
              Lägg till recept
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        <Divider my="sm" />

        <Modal.Body>
          <Stack>
            <TextInput
              label="Länk till receptet"
              placeholder="https://...."
              size="md"
              radius="lg"
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
            />

            <TextInput
              label="Namn på receptet"
              placeholder="Köttbullar...."
              size="md"
              radius="lg"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />

            {errorMessage ? (
              <Alert color="danger" radius="md">
                {errorMessage}
              </Alert>
            ) : null}

            <Button
              loading={addRecipeMutation.isPending}
              onClick={handleSubmit}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              Spara
            </Button>
          </Stack>
        </Modal.Body>

        <Divider my="md" />

        <Modal.Body>
          <FileInput
            label="Lägg in bild"
            description="Lägg in en bild på ingredienser"
            placeholder="Img"
            size="md"
            radius="lg"
          />
        </Modal.Body>
      </ModalContent>
    </Modal.Root>
  );
};
