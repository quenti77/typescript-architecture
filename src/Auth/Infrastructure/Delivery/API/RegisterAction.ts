import {Request, Response} from 'express';
import RegisterJob from "@auth_application/Jobs/RegisterJob";
import RegisterRequest from "@auth_application/DTO/RegisterRequest";
import PgsqlAuthentication from "@auth_infrastructure/Repositories/PgsqlAuthentication";

import connection from '@core/Connection'
import NodePasswordService from "@auth_infrastructure/Services/NodePasswordService";
import IRegister from "@auth_application/Responses/IRegister";
import ApiRegister from "@auth_infrastructure/Responses/ApiRegister";

class RegisterAction {
  public async handle(request: Request, response: Response) {
    const registerRequest: RegisterRequest = new RegisterRequest()
    registerRequest.name = request.body.name
    registerRequest.email = request.body.email
    registerRequest.password = request.body.password

    const registerCommand: RegisterJob = new RegisterJob(
        registerRequest,
        new PgsqlAuthentication(connection),
        new NodePasswordService()
    )

    const registerResponse: IRegister = new ApiRegister(response)
    await registerCommand.handle(registerResponse)
  }
}

export default RegisterAction
