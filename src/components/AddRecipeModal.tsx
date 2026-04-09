import {
  Alert,
  Button,
  Divider,
  FileInput,
  Modal,
  ModalContent,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useAddRecipeMutation } from "../services/recipes/queries";

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRecipeModal = ({ isOpen, onClose }: ComponentProps) => {
  const [recipe, setRecipe] = useState({
    title: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addRecipeMutation = useAddRecipeMutation();

  const handleSubmit = async () => {
    const trimmedUrl = recipe.url.trim();
    setErrorMessage(null);
    const payload = trimmedUrl
      ? { title: recipe.title, url: trimmedUrl }
      : { title: recipe.title };

    addRecipeMutation.mutate(payload, {
      onSuccess: () => {
        setRecipe({ title: "", url: "" });
        setErrorMessage(null);
        handleOnClose();
      },
      onError: (error) => {
        setErrorMessage(error.message || "Kunde inte lagga till recept.");
      },
    });
  };

  const handleOnClose = () => {
    setErrorMessage(null);
    onClose();
  };

  return (
    <div>
      <Modal.Root opened={isOpen} onClose={handleOnClose} centered>
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
            <div>
              <TextInput
                label="Länk till receptet"
                placeholder="https://...."
                size="md"
                radius="lg"
                value={recipe.url}
                onChange={(e) =>
                  setRecipe({ ...recipe, url: e.currentTarget.value })
                }
              />
              <TextInput
                label="Namn på recptetet"
                placeholder="Kötbullar...."
                size="md"
                radius="lg"
                value={recipe.title}
                onChange={(e) =>
                  setRecipe({ ...recipe, title: e.currentTarget.value })
                }
              />
              {errorMessage ? (
                <Alert color="red" mt="sm" radius="md">
                  {errorMessage}
                </Alert>
              ) : null}
              <Button loading={addRecipeMutation.isPending} onClick={handleSubmit}>
                Spara
              </Button>
            </div>
          </Modal.Body>
          <Divider my="md" />
          <Modal.Body>
            <FileInput
              label="Lägg in bild"
              description="Lägg in en bild på ingridienser"
              placeholder="Img"
            />
          </Modal.Body>
        </ModalContent>
      </Modal.Root>
    </div>
  );
};
