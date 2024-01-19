"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@components/dialog";
import { useState } from "react";
import { Button } from "@components/button";
import { ShareIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Checkbox, CheckboxField } from "@components/checkbox";
import { Field, Description, Label } from "@components/fieldset";
import { Badge } from "@components/badge";
import { Strong, Text, TextLink } from "@components/text";

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
  single: "amber",
  pair: "purple",
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
      "The display, typically a high-definition television or a projector, is the visual centerpiece of your home theater system. It's essential to choose one that matches the resolution and size of your viewing room. For a cinematic experience, consider a 4K UHD or 8K display with HDR capabilities, ensuring vibrant colors and deep blacks. Look for features like OLED or QLED technology for deeper contrast and wider viewing angles. Additionally, a display with a high refresh rate (120Hz or higher) is beneficial for fast-moving content like sports and action movies. Compatibility with different HDR formats such as Dolby Vision or HDR10+ can also enhance the viewing experience. When setting up, ensure the screen is positioned at an optimal distance and height for comfortable viewing, and consider ambient light control to prevent reflections and glare.",
  },
  {
    name: "AV Receiver",
    quantity: "single",
    type: "device",
    description:
      "The AV receiver acts as the command center of your home theater system. It not only routes audio and video signals to the display and speakers but also amplifies audio for a rich, dynamic sound. When choosing an AV receiver, consider the number of input and output ports, support for latest audio formats like Dolby Atmos or DTS:X, and compatibility with various video standards including 4K and 8K pass-through. Look for features like room calibration technology, which adjusts audio output to suit the acoustics of your room. Wireless connectivity (Bluetooth, Wi-Fi) for streaming audio and multi-room setup capabilities are also beneficial. The receiver should have enough channels to support all your speakers and provide options for future expansion. Lastly, ensure it integrates seamlessly with your other devices, possibly through a user-friendly interface or a dedicated app.",
  },
  {
    name: "Subwoofer",
    quantity: "single",
    type: "speaker",
    description:
      "The subwoofer is a key component in creating a full-bodied sound by reproducing low-frequency effects (LFE) and deep bass. For optimal performance, choose a subwoofer with a driver size that suits your room (10-12 inches is common for home theaters). Consider the subwoofer's power output and frequency response; a good subwoofer should deliver clean, undistorted bass even at high volumes. Placement is crucial - experiment with different locations in your room to find where the bass sounds best, commonly known as the 'subwoofer crawl'. Some modern subwoofers come with built-in room correction software to optimize performance. If your room is large or acoustically challenging, consider using more than one subwoofer to evenly distribute bass.",
  },
  {
    name: "Center",
    quantity: "single",
    type: "speaker",
    description:
      "The center channel speaker plays a pivotal role in your home theater, handling the bulk of dialogue and front-stage action. When selecting a center speaker, ensure it timbre-matches with your front speakers for a seamless sound transition. A speaker with a good frequency response and high sensitivity is ideal for clear, articulate dialogue. The placement is critical; it should be aligned with your display, ideally just below or above it, and at ear level when seated. This positioning ensures dialogue sounds as if it's coming directly from the actors on screen. Look for a design that minimizes diffraction and cabinet resonance for a clearer sound. Consider a center speaker with a wide dispersion pattern to ensure dialogue clarity from different seating positions.",
  },
  {
    name: "Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Front speakers, comprising a left and right pair, are responsible for delivering the main soundtrack and stereo effects. They should provide a broad soundstage and precise imaging for an immersive experience. Look for speakers with a wide frequency range, ensuring rich highs and full mids. The placement is crucial; they should be placed at an equal distance from the listening position, forming an equilateral triangle with the listener. Tweaking the angle towards the listening area can enhance the stereo imaging. Floor-standing models are ideal for larger rooms, while bookshelf speakers can be adequate for smaller spaces. Bi-wiring or bi-amping can be considered for improved sound quality if your AV receiver and speakers support it.",
  },
  {
    name: "Surround Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Surround front speakers extend the audio environment, creating a more enveloping sound field. These should be placed to the sides of your listening position, slightly above ear level. Bipolar or dipolar speakers are ideal for surround channels as they disperse sound more diffusely, enhancing the immersive effect. The choice between direct-radiating and bipolar/dipolar speakers depends on room acoustics and personal preference. Calibration is key; using your receiver’s calibration system can ensure they integrate seamlessly with the rest of the system. The surround front speakers should complement the tonal qualities of your front and center speakers for a cohesive sound experience.",
  },
  {
    name: "Surround Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "Surround rear speakers are crucial for a full 360-degree audio experience, especially in a 5.1 or 7.1 surround sound setup. They should be placed behind the listener, slightly above ear level, to accurately reproduce sound effects and ambient noises, creating a sense of depth and location. The speakers should ideally have a wide dispersion to blend seamlessly with the front and surround front speakers, avoiding localized sounds. In-wall or on-wall speakers can be a good choice for aesthetic integration and space-saving. If your room's layout doesn't allow for ideal placement, adjustable stands or speaker mounts can offer flexibility. Remember, the goal is to create an immersive, enveloping sound field without any one speaker dominating the soundscape.",
  },
  {
    name: "Atmos Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Atmos front speakers, part of the Dolby Atmos setup, add a vertical dimension to your soundstage, reproducing overhead sound effects. They can be either ceiling-mounted or upward-firing speakers placed on top of your front speakers. The choice depends on your room's layout and aesthetic preference. Ceiling-mounted speakers offer a more precise and immersive overhead sound, but installation can be more complex. Upward-firing speakers are a simpler solution, using the ceiling to reflect sound down to the listener. These speakers should be compatible with Dolby Atmos encoding, and placement is key to ensure the reflected sound accurately simulates overhead effects. Calibrating these speakers with your AV receiver's room correction system is crucial for a balanced and cohesive sound field.",
  },
  {
    name: "Atmos Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "Similar to Atmos front speakers, Atmos rear speakers enhance the vertical sound dimension in your home theater, adding to the immersive experience. Placement is similar to Atmos front speakers but behind the listener. They can be ceiling-mounted or upward-firing, depending on your preference and room constraints. The integration of Atmos rear speakers with the rest of your system is vital; they should work in tandem with front Atmos and traditional surround speakers to create a cohesive and immersive 3D audio bubble. Proper calibration with your AV receiver is essential to ensure the overhead effects are accurately positioned and balanced with the rest of the audio.",
  },
  {
    name: "MiniDSP",
    quantity: "single",
    type: "accessory",
    description:
      "The MiniDSP is a powerful tool for audiophiles and home theater enthusiasts, offering advanced control over audio processing and calibration. It's a digital signal processor that allows you to fine-tune crossover frequencies, equalization, and room correction, ensuring each speaker in your system performs optimally in your specific environment. The ability to apply precise EQ adjustments can compensate for room acoustics and speaker placement issues. Some models offer Dirac Live or similar room correction technology, which measures and corrects the sound in your room for a flat frequency response. The MiniDSP can also be used to integrate multiple subwoofers, managing phase and time alignment for cohesive bass response across the listening area. While it requires some technical knowledge, the MiniDSP can significantly enhance the performance of your home theater audio.",
  },
  {
    name: "HDMI Cable",
    quantity: "multiple",
    type: "accessory",
    description:
      "High-quality HDMI cables are vital for transmitting high-resolution audio and video signals without loss or interference. They connect your display to the AV receiver and other sources like Blu-ray players or streaming devices. Ensure your HDMI cables are certified for the latest standards (e.g., HDMI 2.1 for 4K/8K and high frame rate content). Features like Ethernet support, ARC (Audio Return Channel), and eARC (enhanced ARC) can be beneficial for simplifying connections and improving audio quality. Cable length should be appropriate to your setup to avoid signal degradation, and build quality is important for durability and consistent performance. While extremely high-priced HDMI cables may not offer noticeable performance benefits, avoid very low-cost options as they might not reliably support high-bandwidth signals.",
  },
  {
    name: "Speaker Wire",
    quantity: "multiple",
    type: "accessory",
    description:
      "The right speaker wire is crucial for connecting your speakers to the AV receiver and ensuring optimal sound quality. The gauge (thickness) of the wire should be appropriate for the length of the run and the power of your amplifier. Thicker wires (lower gauge numbers) are better for longer distances and higher power applications. Oxygen-free copper (OFC) is a popular choice for its low resistance and minimal signal degradation. For in-wall installations, use UL-rated speaker wire for safety and compliance with building codes. The wire should be properly insulated to reduce the risk of signal interference from other electronic devices. When connecting, ensure the polarity is consistent across all speakers to avoid phase issues. Neat cable management not only looks better but can also prevent accidental damage or disconnections.",
  },
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

function Popup({
  isOpen,
  setIsOpen,
  item,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Item | null;
}) {
  if (!item) return null;
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogDescription>{item.description}</DialogDescription>
      <DialogBody className="space-y-4">
        <div className="space-x-2 space-y-2">
          <Text>
            <Strong>Quantity:</Strong>
          </Text>
          <Badge color={badgeColors[item.quantity]}>{item.quantity}</Badge>
        </div>
        <div className="space-x-2 space-y-2">
          <Text>
            <Strong>Type:</Strong>
          </Text>
          <Badge color={badgeColors[item.type]}>{item.type}</Badge>
        </div>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setIsOpen(false)}>Also cancel lol</Button>
      </DialogActions>
    </Dialog>
  );
}

function BuildTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <Table striped>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} item={selectedItem} />
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
              <Button
                color="dark/white"
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(true);
                }}
              >
                <PlusIcon />
                Add {item.name}
                {item.quantity === "pair" ? " pair" : ""}
                {item.quantity === "multiple" ? "s" : ""}
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
