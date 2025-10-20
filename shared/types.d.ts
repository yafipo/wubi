interface Configuration {
  wubi_ver: "86" | "98" | "new-centry";
}

type RequestData<T> = {
  id: number;
  data: T;
};

type ResponseData<T> = {
  id: number;
  data: T;
  err?: string;
};

type RR<Req, Res> = [Req, Res];

type IpcMessage = {
  search: RR<string, string[]>;
  tables: RR<void, string[]>;
  table: RR<string, string[]>;
};
