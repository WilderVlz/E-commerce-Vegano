import {User} from "@shared/interfaces/user.interface";
import {Customer} from "@shared/services/customer.service";
import {HistorialRequest} from "@shared/services/pedido.service";

export interface UserState {
  user: User,
  customer: Customer
  historial: HistorialRequest[]
  ordersInProgress: HistorialRequest[]
  loading: boolean;
  error: string | null;
}

