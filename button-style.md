**1 cara untuk mengimplementasikan Liquid Metal Button style ke project Anda:**

## Cara Implementasi: Salin Komponen ke Project Anda

**Langkah-langkah:**

1. **Copy komponen `LiquidMetalButton`** dari file `/components/liquid-metal-button.tsx` ke project Anda
2. **Copy file utility yang dibutuhkan** jika project Anda belum memilikinya
3. **Install dependency yang diperlukan:**

```plaintext
@paper-design/shaders
lucide-react
```


4. **Gunakan komponen di halaman Anda:**

```typescriptreact
import { LiquidMetalButton } from "@/components/liquid-metal-button"

export default function MyPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <LiquidMetalButton label="Click Me" />
    </div>
  )
}
```




