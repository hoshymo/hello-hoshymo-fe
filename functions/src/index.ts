import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';

import * as express from 'express';
const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

fbadmin.initializeApp(functions.config().firebase);
let fs = fbadmin.firestore();
fs.settings({ timestampsInSnapshots: true });

class AclUser {
    userId!: string;
    admin!: boolean;

    constructor(userId: string, admin: boolean) {
        this.userId = userId;
        this.admin = admin;
    }

    // only plain object can be saved as Firestore document
    getPlainObject(): object {
        return { admin: this.admin };
    }
}

class ProjectAclUsersParams {
    userId!: string;
    admin!: boolean;
}

// plain, standard Functions endpoint(s)

export const hello = functions.https.onRequest((req, res) => {
    res.send({ greetings: "hello" });
});

// note: Endponts served through express are exposed in the path under /app/...

app.route('/project/:prjId/acl-users')
    .get(async (req: express.Request, res: express.Response) => {
        let o = await fs.collection("projects").doc("hello").collection("acl-users")
            // .where('id', "==", "")
            .get();
        let obj: AclUser[] = [];
        o.forEach(doc => {
            let au = doc.data() as AclUser
            au.userId = doc.id;
            obj.push(au);
        });
        res.send(obj);
    })
    .post(async (req: express.Request, res: express.Response) => {
        let params = req.body as ProjectAclUsersParams;
        let newobj = new AclUser(params.userId, params.admin);
        let newdoc = fs.collection("projects").doc("hello").collection("acl-users")
            .doc(newobj.userId);
        newdoc.set(newobj.getPlainObject());

        // res.send((await newdoc.get()).data());
        res.send(newobj);
    });

exports.app = functions.https.onRequest(app);
