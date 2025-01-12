import { Request, Response } from 'express';

export class TicketController {
  constructor() {}

  public getTickets = async (req: Request, res: Response) => {
    res.json();
  }

  public getLastTicketNumber  = async (req: Request, res: Response) => {
    res.json( );
  }

  public pendingTickets  = async (req: Request, res: Response) => {
    res.json( );
  }

  public createTicket  = async (req: Request, res: Response) => {
    res.json( );
  }

  public drawTicket  = async (req: Request, res: Response) => {
    res.json( );
  }

  public ticketFinished  = async (req: Request, res: Response) => {
    res.json( );
  }

  public workingOn   = async (req: Request, res: Response) => {
    res.json( );
  }
}
