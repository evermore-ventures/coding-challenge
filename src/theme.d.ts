import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    state: {
      todo: string;
      in_progress: string;
      done: string;
    };
    priority: {
      low: string;
      medium: string;
      high: string;
    };
  }
  interface PaletteOptions {
    state?: {
      todo: string;
      in_progress: string;
      done: string;
    };
    priority?: {
      low: string;
      medium: string;
      high: string;
    };
  }
}
