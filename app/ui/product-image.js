import Image from "next/image";
import { initialsOf } from "@/lib/format";

export function ProductImage({ product, sizes }) {
  if (!product.image) {
    return <div className="tile">{initialsOf(product.name)}</div>;
  }

  return (
    <div className="thumb">
      <Image src={product.image} alt={product.name} fill sizes={sizes} />
    </div>
  );
}
