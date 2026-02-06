import { Title } from "@mantine/core";
import { BoxComponent } from "./BoxComponent";

interface Props {
  date: string;
}

export const DayPlanning = ({ date }: Props) => {
  return (
    <div>
      <Title order={2}>{date}</Title>
      <BoxComponent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nostrum
        totam reiciendis laborum ipsa facere, non dolore, neque veritatis quo
        illum exercitationem molestiae iusto fugit, qui adipisci ipsum alias
        quam!
      </BoxComponent>
    </div>
  );
};
