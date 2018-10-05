export class RequirementDetails {

    public id?: string;
    public eucRefId?: string;
    public rgsId?: string;
    public reqId?: string;
    public account?: string;
    public positionOwner?: string;
    public openDate?: Date;
    public site?: string;
    public location?: string;
    public position?: string;
    public skillCategory?: string;
    public mainSkill?: string;
    public additionalSkill?: string;
    public domain?: string;
    public projectName?: string;
    public expBand?: string;
    public startDate?: Date;
    public reqType?: string;
    public reqClass?: string;
    public contractor?: string;
    public trainee?: string;
    public revenueWithinQtr?: string;
    public status?: string;
    public employeeId?: string;
    public resourceName?: string;
    public closedDate?: Date;
    public onboardDate?: Date;
    public won?: string;
    public allocationDate?: Date;
    public through?: string;
    public closedBy?: string;
    public remarks?: string;

    constructor(
        id?: string,
        eucRefId?: string,
        rgsId?: string,
        reqId?: string,
        account?: string,
        positionOwner?: string,
        openDate?: Date,
        site?: string,
        location?: string,
        position?: string,
        skillCategory?: string,
        mainSkill?: string,
        additionalSkill?: string,
        domain?: string,
        projectName?: string,
        expBand?: string,
        startDate?: Date,
        reqType?: string,
        reqClass?: string,
        contractor?: string,
        trainee?: string,
        revenueWithinQtr?: string,
        status?: string,
        employeeId?: string,
        resourceName?: string,
        closedDate?: Date,
        onboardDate?: Date,
        won?: string,
        allocationDate?: Date,
        through?: string,
        closedBy?: string,
        remarks?: string
    ) {
        this.id = id;
        this.eucRefId = eucRefId;
        this.rgsId = rgsId;
        this.reqId = reqId;
        this.account = account;
        this.positionOwner = positionOwner;
        this.openDate = openDate;
        this.site = site;
        this.location = location;
        this.position = position;
        this.skillCategory = skillCategory;
        this.mainSkill = mainSkill;
        this.additionalSkill = additionalSkill;
        this.domain = domain;
        this.projectName = projectName;
        this.expBand = expBand;
        this.startDate = startDate;
        this.reqType = reqType;
        this.reqClass = reqClass;
        this.contractor = contractor;
        this.trainee = trainee;
        this.revenueWithinQtr = revenueWithinQtr;
        this.status = status;
        this.employeeId = employeeId;
        this.resourceName = resourceName;
        this.closedDate = closedDate;
        this.onboardDate = onboardDate;
        this.won = won;
        this.allocationDate = allocationDate;
        this.through = through;
        this.closedBy = closedBy;
        this.remarks = remarks;
    }
}
