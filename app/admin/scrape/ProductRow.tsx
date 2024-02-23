import { TableCell, TableRow } from "@/components/table";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { TrashIcon } from "@heroicons/react/16/solid";
import type { ScrapedProduct } from "@/database/types";
import { useState } from "react";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";

export default function ProductRow(props: {
  index: number;
  product: ScrapedProduct;
  onChange: (index: number, newProduct: ScrapedProduct) => void;
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
            src={product.image_url}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
        </a>
      </TableCell>
      {/* title */}
      <TableCell>
        <Input
          type="text"
          name="title"
          value={product.name}
          onChange={updateItemAndSync}
          invalid={!product.name}
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
      <TableCell className="w-56 max-w-56">
        <Listbox name="highlights" defaultValue={product.highlights[0]}>
          {product.highlights.map((highlight, i) => (
            <ListboxOption key={i} value={highlight}>
              <ListboxLabel>
                {highlight}
              </ListboxLabel>
            </ListboxOption>
          ))}
        </Listbox>
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
