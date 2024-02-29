import { CreateAudLog } from "@/interfaces";
import { ACTION } from "@prisma/client";

export const auditLogs = (log: any) => {
  const { action, tableTitle, tableType } = log;
  switch (action) {
    case ACTION.CREATE:
      return `created ${tableType?.toLowerCase()} ${tableTitle}`;
    case ACTION.UPDATE:
      return `updated ${tableType?.toLowerCase()} ${tableTitle}`;
    case ACTION.DELETE:
      return `deleted ${tableType?.toLowerCase()} ${tableTitle}`;
  }
};
