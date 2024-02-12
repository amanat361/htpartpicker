/* eslint-disable @next/next/no-img-element */
import { TableCell, TableRow } from "@components/table";
import { Button } from "@components/button";
import { Input } from "@components/input";
import { TrashIcon, CheckBadgeIcon } from "@heroicons/react/16/solid";
import type { Product } from "@/app/api/scrape/route";
import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@components/dropdown";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function ProductRow(props: {
  index: number;
  product: Product;
  onChange: (index: number, newProduct: Product) => void;
  onDelete: (index: number) => void;
}) {
  const [product, setProduct] = useState(props.product);

  function updateItemAndSync(e: React.ChangeEvent<HTMLInputElement>) {
    const property = e.target.name;
    const newValue = e.target.value;
    setProduct((prevProduct) => {
      const newProduct = { ...prevProduct, [property]: newValue };
      props.onChange(props.index, newProduct);
      return newProduct;
    });
  }

  return (
    <TableRow key={product.url}>
      {/* image */}
      <TableCell>
        <a href={product.url} target="_blank" rel="noreferrer">
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 rounded-xl object-cover"
          />
        </a>
      </TableCell>
      {/* title */}
      <TableCell>
        <Input
          type="text"
          name="title"
          value={product.title}
          onChange={updateItemAndSync}
          invalid={!product.title}
        />
      </TableCell>
      {/* brand */}
      <TableCell>
        <Input
          type="text"
          name="brand"
          value={product.brand}
          onChange={updateItemAndSync}
          invalid={!product.brand}
        />
      </TableCell>
      {/* price */}
      <TableCell>
        <Input
          type="text"
          name="price"
          value={product.price}
          onChange={updateItemAndSync}
          invalid={!product.price}
        />
      </TableCell>
      {/* description */}
      <TableCell>
        <Input
          type="text"
          name="description"
          value={product.description}
          onChange={(e) => {
            setProduct({ ...product, description: e.target.value });
          }}
          invalid={!product.description}
        />
      </TableCell>
      {/* highlights */}
      <TableCell>
        <Dropdown>
          <DropdownButton outline>
            View Highlights
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu>
            {product.highlights.map((highlight, i) => (
              <DropdownItem key={i}>
                <CheckBadgeIcon />
                {highlight}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </TableCell>
      {/* delete */}
      <TableCell>
        <Button
          type="button"
          color="red"
          onClick={() => {
            props.onDelete(props.index);
          }}
        >
          <TrashIcon />
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}
