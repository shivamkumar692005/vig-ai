// types/html2pdf.d.ts
declare module 'html2pdf.js/dist/html2pdf.min.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number] | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement | null): Html2Pdf;
    save(): Promise<void>;
  }

  interface Html2PdfStatic {
    (): Html2Pdf;
  }

  const html2pdf: Html2PdfStatic;

  export = html2pdf;
}