import { CardType, ImageFile } from "@/@types";

export function numberWithCommas(x: string) {
  return !!x ? x.toString().replaceAll(',', '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x;
}

export const enableSplashScreen = (fnCallBack?: Function) => {
  !!fnCallBack && fnCallBack()

  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex');
  }
};

export const disableSplashScreen = (fnCallBack?: Function) => {
  !!fnCallBack && fnCallBack()
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none');
  }
};

export const removeSlash = (s: string) => s.replace(/\//g, '');

export const e2p = (s: string) => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
export const e2a = (s: string) => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);

export const p2e = (s: string) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
export const a2e = (s: string) => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());

export const p2a = (s: string) => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
export const a2p = (s: string) => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);

export const cardTypeMapper: Record<string, CardType> = {
  'آبی': CardType.BLUE,
  'طلایی': CardType.GOLD,
  'طلایی پلاس': CardType.GOLDPLUS,
  'نقره‌ای': CardType.SILVER,
  'پلاتینیوم': CardType.GRAY,
};

export const fileToBase64 = (file: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
});

export const objectToFormData = (obj: any): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}

export const dataURLtoFile = (dataurl: string, filename: string) => {
  if (!!dataurl.length === false)
    return undefined;

  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const imageFiletoFile = (imageFile: ImageFile) => {
  if (!!imageFile.File.length === false)
    return undefined;

  let arr = imageFile.File.split(','),
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], imageFile.FileName, { type: imageFile.FileFormat });
}

export const base64ToExcelDownload = (data: any, fileName: string) => {
  const byteArray = base64toBlob(data)
  const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute(
    'download',
    `${fileName}-${currentDate()}.xlsx`
  )

  document.body.appendChild(link)
  link.click()
}

export const blobToExcelDownload = (data: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}-${currentDate()}.xlsx`); //or any other extension
  document.body.appendChild(link);
  link.click();
}

const base64toBlob = (data: string) => {
  const base64Data = data as string;
  const binaryData = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  return uint8Array;
}

function currentDate(): string {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour clock
  };

  const formattedDate = currentDate.toLocaleString('en-US', options);

  return formattedDate;
}