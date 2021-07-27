import { UserActions } from "../User/types";

export type ActionType = { type: string; payload: any };

export type RootActions = {
  user: UserActions;
};
