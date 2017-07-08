export class Team {
    public id?: number;
    public name?: string;
    public award?: boolean;
    public agree_to_play_sight?: boolean;
    public use_putt_view?: boolean;
    public drive_and_putt_score?: PuttScore;
    public players?: Array <Player>;

    constructor (
        id?: number,
        name?: string,
        award?: boolean,
        agree_to_play_sight?: boolean,
        use_putt_view?: boolean,
        drive_and_putt_score?: PuttScore,
        players?: Array <Player>
    ) {
        this.id = id ? id : 0;
        this.name = name ? name : null;
        this.award = award ? award : true;
        this.agree_to_play_sight = agree_to_play_sight ? agree_to_play_sight : true;
        this.use_putt_view = use_putt_view ? use_putt_view : true;
        this.drive_and_putt_score = drive_and_putt_score ? drive_and_putt_score : null;
        this.players = players ? players : null;
    }
}

export class PuttScore {
    public putts?: number;
    public time?: number;
    public total_score?: number;

    constructor (
        putts?: number,
        time?: number,
        total_score?: number
    ) {
        this.putts = putts ? putts : 0;
        this.time = time ? time : 0;
        this.total_score = total_score ? total_score : 0;
    }
}

export class HoleScore {
    public circle_hit?: boolean;
    public play_sight?: boolean;
    public holed?: boolean;
    public putt_view?: boolean;

    constructor (
        circle_hit?: boolean,
        play_sight?: boolean,
        holed?: boolean,
        putt_view?: boolean
    ) {
        this.circle_hit = circle_hit ? circle_hit : true;
        this.play_sight = play_sight ? play_sight : true;
        this.holed = holed ? holed : true;
        this.putt_view = putt_view ? putt_view : true;
    }
}

export class Player {
    public id?: number;
    public nick_name?: string;
    public first_name?: string;
    public last_name?: string;
    public email_telephone?: string;
    public birthdate?: string;
    public hole_in_one_score?: HoleScore;

    constructor(
        id?: number,
        nick_name?: string,
        first_name?: string,
        last_name?: string,
        email_telephone?: string,
        birthdate?: string,
        hole_in_one_score?: HoleScore
    ) {
        this.id = id ? id : null;
        this.nick_name = nick_name ? nick_name : "";
        this.first_name = first_name ? first_name : null;
        this.last_name = last_name ? last_name : null;
        this.email_telephone = email_telephone ? email_telephone : null;
        this.birthdate = birthdate ? birthdate : null;
        this.hole_in_one_score = hole_in_one_score ? hole_in_one_score : null;
    }
}

export class TeamEvent {
    public event_name?: string;
    public tag?: string;
    public team?: Team;
    

    constructor(
        event_name?: string,
        tag?: string,
        team?: Team,
        
    ) {
        this.event_name = event_name ? event_name : "drive-and-putt";
        this.tag = tag ? tag : "test";
        this.team = team ? team : null;
       
    }
}
