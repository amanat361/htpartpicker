import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Button } from "@components/button";
import { ShareIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Checkbox, CheckboxField } from '@components/checkbox';
import { Description, Label } from '@components/fieldset';
import { Badge } from '@components/badge';
import { TextLink } from '@components/text';

const items = [
  "Display",
  "AV Receiver",
  "Subwoofer",
  "Center",
  "Left Channel",
  "Right Channel",
  "Surround Left",
  "Surround Right",
  "Surround Back Left",
  "Surround Back Right",
  "Atmos Left",
  "Atmos Right",
  "Atmos Left Rear",
  "Atmos Right Rear",
]



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
    <div className='grid sm:grid-cols-3 gap-4 items-start'>
      <CheckboxField>
        <Checkbox name="small" />
        <Label>2.1 Configuration</Label>
        <Description>
          2.1 is the simplest configuration for a home theater. It consists of a left and right channel, and a subwoofer. Good for music, shows, and small rooms.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="medium" />
        <Label>5.1 Configuration</Label>
        <Description>
          5.1 is the most common configuration for a home theater. It consists of a center channel, left and right channels, two surround channels, and a subwoofer.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="large" />
        <Label>7.1 Configuration</Label>
        <Description>
          7.1 adds two additional surround channels to the 5.1 configuration. Good for larger rooms where the listener is far from the surround speakers.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_small" />
        <Label>7.1.2 Configuration</Label>
        <Description>
          7.1.2 adds two additional Atmos channels to the 7.1 configuration. These are typically placed in the ceiling above the listener for a more immersive experience.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_medium" />
        <Label>7.1.4 Configuration</Label>
        <Description>
          7.1.4 adds four additional Atmos channels to the 7.1 configuration. The extra two Atmos channels are placed in the rear of the room.
        </Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="atmos_large" />
        <Label>9.1.4 Configuration</Label>
        <Description>
          9.1.4 adds two additional surround channels to the 7.1.4 configuration. This setup is for the true audiophile who wants the best possible experience.
        </Description>
      </CheckboxField>
    </div>
  );
}

function BuildTable() {
  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Component</TableHeader>
          <TableHeader>Selection</TableHeader>
          <TableHeader>Recommended</TableHeader>
          <TableHeader>Price</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item}>
            <TableCell>{item}</TableCell>
            <TableCell>
              <Button color="dark/white">
                <PlusIcon />
                Add {item}
              </Button>
            </TableCell>
            <TableCell className="space-x-2">
              <Badge color="green">Recommended</Badge>
              <Badge color="yellow">Works with setup</Badge>
              <Badge color="red">Not Recommended</Badge>
            </TableCell>
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
    <div className='max-w-6xl w-full space-y-12'>
      <SectionHeading title="Build your Home Theater" />
      <Configurations />
      <BuildTable />
    </div>
  )
}