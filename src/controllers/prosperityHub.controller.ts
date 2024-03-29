import { NextFunction, Request, Response } from 'express';
import {
  createProsperityHub,
  getAllProsperityHubs,
  findProsperityHub,
  findProsperityHubById,
  findUniqueProsperityHub,
  updateProsperityHub,
  deleteProsperityHub,
  
} from '../services/prosperityHub.service'
import AppError from '../utils/appError';
import {
  CreateProsperityHubInput,
  UpdateProsperityHubInput
} from "../schemas/prosperityHub.schema"
import prisma from '../utils/prismaClient';
import agentRouter from '../routes/agent.routes';
import { userInfo } from 'os';

export const createProsperityHubHandler = async (
  req: Request<{}, {}, CreateProsperityHubInput> | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const agentId = req.user.sub
    const prosperityHub = await createProsperityHub({
      name: req.body.name,
      address: req.body.address,
      remarks: req.body.remarks,
      agentId: agentId
    });
 console.log(prosperityHub);
    return res.status(201).json({
      status: "success",
      prosperityHub
    })
  } catch (err: any) { 
    console.log(37, err)   
    next(err);
  }
};


export const viewProsperityHubsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await getAllProsperityHubs()
      res.status(200).status(200).json({
        hello: "hello viewProsperityHubsHandler",
      status: 'success',
      data: {
        agents,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// get single agent
export const viewProsperityHubHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const agent = await prisma.agent.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        prosperityHub: true,
        warhouse: true
      }
})
     if (!agent) {
      return next(new AppError(401, 'Agent does not exist'));
    }
      return res.status(200).status(200).json({
        hello: "hello viewProsperityHubHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    console.log(76, err);
    next(err);
  }
};

export const updateProsperityHubHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = res.locals.agent;

      res.status(200).status(200).json({
        hello: "hello updateProsperityHubHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProsperityHubHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = res.locals.agent;

      res.status(200).status(200).json({
        hello: "hello deleteProsperityHubHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


