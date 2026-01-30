import {
  Button,
  Divider,
  FileInput,
  Modal,
  ModalContent,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddRecipeModal({ isOpen, onClose }: ComponentProps) {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    alert(input);
    handleOnClose();
  };

  const handleOnClose = () => {
    onClose();
    setInput("");
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
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <Button onClick={handleSubmit}>Spara</Button>
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
}
