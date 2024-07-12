interface Response<T> {
  data: T;
  rawData: any;
  error?: string;
  response: any;
}

declare const $http: {
  streamRequest: <T>(params: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    header?: Record<string, string>;
    body: any;
    files?: File[];
    timeout?: number;
    cancelSignal?: import("./types").Signal;
    streamHandler?: (stream: import("./types").Stream) => void;
    handler?: (response: Response<T>) => void;
  }) => Promise<Response<T>>;
};

declare const $log: {
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
};

declare const $data: {
  fromUTF8: (str: string) => string;
};

declare const $option: {
  [K in import("./info.json")["options"][number]["identifier"]]: string;
};
