import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { Button } from "@components/button";
import { ShareIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Checkbox, CheckboxField } from "@components/checkbox";
import { Description, Label } from "@components/fieldset";
import { Badge } from "@components/badge";
import { TextLink } from "@components/text";

type BadgeColor =
  | "teal"
  | "blue"
  | "purple"
  | "amber"
  | "yellow"
  | "green"
  | "red"
  | "fuchsia";
interface BadgeColors {
  [key: string]: BadgeColor;
}

const badgeColors = {
  device: "teal",
  speaker: "blue",
  accessory: "fuchsia",
  works: "yellow",
  recommended: "green",
  incompatible: "red",
} as BadgeColors;

type Item = {
  name: string;
  quantity: "single" | "pair" | "multiple";
  type: "device" | "speaker" | "accessory";
  description: string;
};

const items = [
  {
    name: "Display",
    quantity: "single",
    type: "device",
    description:
      "The display is the visual output device for the home theater system.",
  },
  {
    name: "AV Receiver",
    quantity: "single",
    type: "device",
    description:
      "The AV receiver is the central hub that connects and controls all the audio and video components of the home theater system.",
  },
  {
    name: "Subwoofer",
    quantity: "single",
    type: "speaker",
    description:
      "The subwoofer is responsible for reproducing low-frequency sounds, such as deep bass and rumbling effects.",
  },
  {
    name: "Center",
    quantity: "single",
    type: "speaker",
    description:
      "The center speaker is responsible for reproducing dialogue and other central audio elements in movies and TV shows.",
  },
  {
    name: "Front",
    quantity: "pair",
    type: "speaker",
    description:
      "The front speakers are responsible for reproducing the main audio elements, such as music, sound effects, and dialogue.",
  },
  {
    name: "Surround Front",
    quantity: "pair",
    type: "speaker",
    description:
      "The surround front speakers are responsible for reproducing ambient sounds and directional audio effects that enhance the immersive experience.",
  },
  {
    name: "Surround Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "The surround rear speakers are responsible for reproducing rear and surround sound effects, creating a more immersive audio experience.",
  },
  {
    name: "Atmos Front",
    quantity: "pair",
    type: "speaker",
    description:
      "The Atmos front speakers are responsible for reproducing overhead sound effects, creating a three-dimensional audio experience.",
  },
  {
    name: "Atmos Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "The Atmos rear speakers are responsible for reproducing additional overhead sound effects, enhancing the three-dimensional audio experience.",
  },
  {
    name: "MiniDSP",
    quantity: "single",
    type: "accessory",
    description:
      "The MiniDSP is a digital signal processor that allows for fine-tuning of the audio output.",
  },
  {
    name: "HDMI Cable",
    quantity: "multiple",
    type: "accessory",
    description:
      "The HDMI cable is used to connect the display to the AV receiver.",
  },
  {
    name: "Speaker Wire",
    quantity: "multiple",
    type: "accessory",
    description:
      "The speaker wire is used to connect the speakers to the AV receiver.",
  }
] as Item[];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="border-b border-gray-200 pb-5 flex flex-col sm:flex-row items-center sm:justify-between">
      <h1 className="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <div className="mt-3 flex sm:ml-4 sm:mt-0 gap-4">
        <Button outline>
          <ShareIcon />
          Share
        </Button>
        <Button>
          <PlusIcon />
          Create
        </Button>
      </div>
    </div>
  );
}

function Configurations() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 items-start">
      <CheckboxField>
        <Checkbox name="small" />
        <Label>2.1 Configuration</Label>
        <Description>
          2.1 is the simplest configuration for a home theater. It consists of a
          left and right channel, and a subwoofer. Good for music, shows, and
          small rooms.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="medium" />
        <Label>5.1 Configuration</Label>
        <Description>
          5.1 is the most common configuration for a home theater. It consists
          of a center channel, left and right channels, two surround channels,
          and a subwoofer.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="large" />
        <Label>7.1 Configuration</Label>
        <Description>
          7.1 adds two additional surround channels to the 5.1 configuration.
          Good for larger rooms where the listener is far from the surround
          speakers.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_small" />
        <Label>7.1.2 Configuration</Label>
        <Description>
          7.1.2 adds two additional Atmos channels to the 7.1 configuration.
          These are typically placed in the ceiling above the listener for a
          more immersive experience.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_medium" />
        <Label>7.1.4 Configuration</Label>
        <Description>
          7.1.4 adds four additional Atmos channels to the 7.1 configuration.
          The extra two Atmos channels are placed in the rear of the room.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_large" />
        <Label>9.1.4 Configuration</Label>
        <Description>
          9.1.4 adds two additional surround channels to the 7.1.4
          configuration. This setup is for the true audiophile who wants the
          best possible experience.
        </Description>
      </CheckboxField>
    </div>
  );
}

function BuildTable() {
  return (
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeader>Component</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Selection</TableHeader>
          <TableHeader>Recommended</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Link</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge color={badgeColors[item.type]}>{item.type}</Badge>
            </TableCell>
            <TableCell>
              <Button color="dark/white">
                <PlusIcon />
                Add {item.name}{item.quantity === "pair" ? " pair" : ""}{item.quantity === "multiple" ? "s" : ""}
              </Button>
            </TableCell>
            <TableCell className="space-x-2">
              <Badge color="yellow">Works with setup</Badge>
            </TableCell>
            <TableCell>$100</TableCell>
            <TableCell>
              <TextLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                View on Amazon
              </TextLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BuildPage() {
  return (
    <div className="max-w-6xl w-full space-y-12">
      <SectionHeading title="Build your Home Theater" />
      <Configurations />
      <BuildTable />
    </div>
  );
}
