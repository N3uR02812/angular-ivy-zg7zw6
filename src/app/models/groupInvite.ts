export class GroupInvite {
    UserEmails: string[];
    GroupId: string;

    constructor(values: GroupInvite) {

        if (!values) { values = {} as GroupInvite; }

        this.UserEmails = values.UserEmails || [];
        this.GroupId = values.GroupId || '';
    }
}