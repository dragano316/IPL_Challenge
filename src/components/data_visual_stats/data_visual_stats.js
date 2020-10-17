import React,{Component} from 'react';
import Papa from 'papaparse';
import './data_visual_stats.css';
import Infobox from '../infoboxes/infobox';
import Charts from '../charts/chart';
import Match from '../../assets/Match.csv';
import Player from '../../assets/Player.csv';
import Ball_by_Ball from '../../assets/Ball_by_Ball.csv';
import Season from '../../assets/Season.csv';



class DataContent extends Component {
    constructor(){
        super();
        this.state = {
            chartinfo1:{},
            chartinfo2: {},
            chartinfo3: {},
            chartinfo4: {},
            chartinfo5: {},
            chartinfo6: {},
            chartinfo7: {},
            chartinfo8:{},
            Match: {},
            Player: {},
            BallByBall: {},
            Season: {},
            infobox1:0,
            infobox2:0,
            infobox3:0,
            infobox4:0,
            Infobox5:0,
            infobox6:0,
            infobox7:0,
            infobox8:0,

        };
    }

    componentDidMount=()=>{
        this.fetchData();
    }

    //CSV file to JSON 
    fetchData = () => {
        Papa.parse(Match, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: this.savingmatch
        });
        Papa.parse(Player, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: this.savingplayer
        });
         Papa.parse(Ball_by_Ball, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: this.savingballbyball
        });
         Papa.parse(Season, {
            header: true, 
            download: true, 
            dynamicTyping: true,
            complete: this.savingseason
        });

    }

    // data saving and function calling
    savingmatch= (res) => {
         this.setState({ Match: res });
         this.infochart1();
         this.infochart2();
         this.infochart3();
         this.infochart8();
         this.databox_2_4_8();
    }
    savingplayer= (res) => {
         this.setState({ Player: res });
         this.infochart4();
         this.infochart5();
         this.infochart6();
         this.databox_3_5();
    }
    savingballbyball = (res) => {
           this.setState({ BallByBall: res });
        //   this.infochart7();
         this.infochart7();
          this.databox_6_7();
    }
    savingseason = (res) => {
         this.setState({Season: res});
         this.databox_1();
    }


    infochart1 = () => {
        //Toss
        let batcount = 0;
        if(Object.keys(this.state.Match).length !== 0){
            this.state.Match.data.forEach(e => {
                if(e.Toss_Decision === "bat"){
                    batcount++;
                }
            });

            this.setState({
                chartinfo1: {
                    labels: ['Bat', 'Field'],
                    datasets: [
                        {
                            label: 'Bat or Field Decision',
                            data: [batcount, this.state.Match.data.length - batcount],
                            backgroundColor: [
                                'rgb(236, 239, 43,0.75)',
                                'rgb(102, 244, 128,0.75)'
                            ],
                            borderColor: [
                                'rgb(236, 239, 43,1)',
                                'rgb(102, 244, 128,1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });
        }
    }

    infochart2 = () => {
        // Host Countries
        let countries = {};
        if(Object.keys(this.state.Match).length !== 0){
            this.state.Match.data.forEach(e => {
                if(countries[e.Host_Country] !== undefined) {
                    countries[e.Host_Country] += 1;
                } else {
                    if(e.Match_Id>0){
                        countries[e.Host_Country] = 1;
                    }
                }
            });

            this.setState({
                chartinfo2: {
                    labels: [...Object.keys(countries)],
                    datasets: [
                        {
                            label: 'Host Countries',
                            data: [...Object.values(countries)],
                            backgroundColor: [
                                'rgb(239, 137, 119,0.75)',
                                'rgb(247, 158, 236,0.75)',
                                'rgb(153, 158, 247,0.75)',
                            ],
                            borderColor: [
                                'rgb(239, 137, 119,1)',
                                'rgb(247, 158, 236,1)',
                                'rgb(153, 158, 247,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }

    infochart3 = () => {
        // Result Type
        let winType = {};
        if(Object.keys(this.state.Match).length !== 0){
            this.state.Match.data.forEach(e => {
                if(winType[e.Win_Type] !== undefined) {
                    winType[e.Win_Type] += 1;
                } else{
                    if(e.Match_Id>0){
                        winType[e.Win_Type] = 1;
                    }

                }
            });

            this.setState({
                chartinfo3: {
                    labels: [...Object.keys(winType)],
                    datasets: [
                        {
                            label: 'Result Type',
                            data: [...Object.values(winType)],
                            backgroundColor: [
                                'rgb(239, 137, 119,0.75)',
                                'rgb(247, 158, 236,0.75)',
                                'rgb(244, 224, 141,0.75)',
                                'rgb(153, 158, 247,0.75)',
                            ],
                            borderColor: [
                                'rgb(239, 137, 119,1)',
                                'rgb(252, 184, 201,1)',
                                'rgb(244, 224, 141,1)',
                                'rgb(153, 158, 247,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }

    infochart4 = () => {
        // Right or Left Handed Batsman
        var handType = {};
        if(Object.keys(this.state.Player).length !== 0){
            handType.Left_Hand = 0;
            handType.Right_Hand = 0;
            this.state.Player.data.forEach(e => {
                if(e.Batting_Hand === "Left_Hand" || e.Batting_Hand === "Right_Hand") {
                    handType[e.Batting_Hand] += 1;
                }
            });

            this.setState({
                chartinfo4: {
                    labels: [...Object.keys(handType)],
                    datasets: [
                        {
                            label: 'Left or Right Handed Batsmen',
                            data: [...Object.values(handType)],
                            backgroundColor: [
                                'rgb(138, 247, 245,0.75)',
                                'rgb(153, 158, 247,0.75)',
                            ],
                            borderColor: [
                                'rgb(138, 247, 245,1)',
                                'rgb(153, 158, 247,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }

    infochart5 = () => {
        // Bowling Skills
        var bowlingSkill = {};
        if(Object.keys(this.state.Player).length !== 0){
            this.state.Player.data.forEach(e => {
                if(bowlingSkill[e.Bowling_Skill] !== undefined) {
                    bowlingSkill[e.Bowling_Skill] += 1;
                } else {
                    if(e.Player_Id!=null && e.Bowling_Skill!=="NULL"){
                        bowlingSkill[e.Bowling_Skill] = 1;
                    }
                }
            });



            this.setState({
                chartinfo5: {
                    labels: [...Object.keys(bowlingSkill)],
                    datasets: [
                        {
                            label: 'Bowling Skill',
                            data: [...Object.values(bowlingSkill)],
                            backgroundColor: [
                                'rgb(239, 137, 119,0.75)',
                                'rgb(252, 184, 201,0.75)',
                                'rgb(244, 224, 141,0.75)',
                                'rgb(138, 247, 245,0.75)',
                                'rgb(118, 242, 36,0.75)',
                                'rgb(247, 158, 236,0.75)',
                                'rgb(153, 158, 247,0.75)',
                                'rgb(141, 252, 178,0.75)',
                                'rgb(215, 136, 239,0.75)',
                                'rgb(247, 153, 98,0.75)',
                                'rgb(154, 172, 244,0.75)',
                                'rgb(198, 124, 67,0.75)',
                                'rgb(54, 237, 151,0.75)',
                                'rgb(236, 239, 43,0.75)',
                                'rgb(102, 244, 128,0.75)'
                            ],
                            borderColor: [
                                'rgb(239, 137, 119,1)',
                                'rgb(252, 184, 201,1)',
                                'rgb(244, 224, 141,1)',
                                'rgb(138, 247, 245,1)',
                                'rgb(118, 242, 36,1)',
                                'rgb(247, 158, 236,1)',
                                'rgb(153, 158, 247,1)',
                                'rgb(141, 252, 178,1)',
                                'rgb(215, 136, 239,1)',
                                'rgb(247, 153, 98,1)',
                                'rgb(154, 172, 244,1)',
                                'rgb(198, 124, 67,1)',
                                'rgb(54, 237, 151,1)',
                                'rgb(236, 239, 43,1)',
                                'rgb(102, 244, 128,1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }

    infochart6 = () => {
        // Players Nationality
        var nationality = {};
        if(Object.keys(this.state.Player).length !== 0){
            this.state.Player.data.forEach(e => {
                if(nationality[e.Country] !== undefined) {
                    nationality[e.Country] += 1;
                } else {
                    if(e.Player_Id!=null){
                        nationality[e.Country] = 1;
                    }
                }
            });

            this.setState({
                chartinfo6: {
                    labels: [...Object.keys(nationality)],
                    datasets: [
                        {
                            label: 'Player Nationality',
                            data: [...Object.values(nationality)],
                            backgroundColor: [
                                'rgb(239, 137, 119,0.75)',
                                'rgb(252, 184, 201,0.75)',
                                'rgb(244, 224, 141,0.75)',
                                'rgb(138, 247, 245,0.75)',
                                'rgb(118, 242, 36,0.75)',
                                'rgb(247, 158, 236,0.75)',
                                'rgb(153, 158, 247,0.75)',
                                'rgb(141, 252, 178,0.75)',
                                'rgb(215, 136, 239,0.75)',
                                'rgb(247, 153, 98,0.75)',
                            ],
                            borderColor: [
                                'rgb(239, 137, 119,1)',
                                'rgb(252, 184, 201,1)',
                                'rgb(244, 224, 141,1)',
                                'rgb(138, 247, 245,1)',
                                'rgb(118, 242, 36,1)',
                                'rgb(247, 158, 236,1)',
                                'rgb(153, 158, 247,1)',
                                'rgb(141, 252, 178,1)',
                                'rgb(215, 136, 239,1)',
                                'rgb(247, 153, 98,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }


    infochart7 = () => {
        // Types of Dismissals
        var dismissalType = {};
        if(Object.keys(this.state.BallByBall).length !== 0){
            this.state.BallByBall.data.forEach(e => {
                if(dismissalType[e.Dissimal_Type] !== undefined) {
                    dismissalType[e.Dissimal_Type] += 1;
                } 
                else if(e.Dissimal_Type !== undefined && e.Dissimal_Type !== ' ') {
                    dismissalType[e.Dissimal_Type] = 1;
                }
            });


            this.setState({
                chartinfo7: {
                    labels: [...Object.keys(dismissalType)],
                    datasets: [
                        {
                            label: 'Types of Dismissals',
                            data: [...Object.values(dismissalType)],
                            backgroundColor: [
                                'rgb(239, 137, 119,0.75)',
                                'rgb(252, 184, 201,0.75)',
                                'rgb(244, 224, 141,0.75)',
                                'rgb(138, 247, 245,0.75)',
                                'rgb(118, 242, 36,0.75)',
                                'rgb(247, 158, 236,0.75)',
                                'rgb(153, 158, 247,0.75)',
                                'rgb(141, 252, 178,0.75)',
                                'rgb(215, 136, 239,0.75)',
                            ],
                            borderColor: [
                                'rgb(239, 137, 119,1)',
                                'rgb(252, 184, 201,1)',
                                'rgb(244, 224, 141,1)',
                                'rgb(138, 247, 245,1)',
                                'rgb(118, 242, 36,1)',
                                'rgb(247, 158, 236,1)',
                                'rgb(153, 158, 247,1)',
                                'rgb(141, 252, 178,1)',
                                'rgb(215, 136, 239,1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });

        }
    }
    infochart8 = () => {
        // Host Cities
        let cities={};
            this.state.Match.data.forEach(e => {
                if(cities[e.City_Name] !== undefined) {
                    cities[e.City_Name] += 1;
                } else {
                    if(e.Match_Id>0){
                        cities[e.City_Name] = 1;
                    }
                }
            });

            this.setState({
                chartinfo8: {
                    labels: [...Object.keys(cities)],
                    datasets: [
                        {
                            label: 'Cities',
                            data: [...Object.values(cities)],
                            backgroundColor: [
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',
                                'rgba(9, 168, 250,0.5)',

                            ],
                            borderColor: [
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',
                                'rgba(9, 168, 250,1)',

                            ],
                            borderWidth: 1
                        }
                    ]
                }
            });
    }

    databox_1 = () => {

        let totalseasons = 0;
        if(Object.keys(this.state.Season).length !== 0){
            totalseasons=this.state.Season.data.length-1
            //Number of seasons
            this.setState({ infobox1:totalseasons});
        }

    }

    databox_2_4_8 = () => {        

        let superovers = 0;
        let duckworthlewis=0;

        if(Object.keys(this.state.Match).length !== 0){

            for(var i = 0; i < this.state.Match.data.length; i++){
                if(this.state.Match.data[i].IS_Superover === 1){
                    superovers++;
                }
                if(this.state.Match.data[i].Is_DuckWorthLewis === 1){
                    duckworthlewis++;
                }
            }

            // Number of Matches
            this.setState({infobox2: this.state.Match.data.length - 1});
            // Number of Superovers
            this.setState({ infobox4: superovers });
            // Number of DuckWorthLewis
            this.setState({ infobox8: duckworthlewis });


        }
    }

    databox_3_5=()=>{
        var totalplayers=this.state.Player.data.length;
            
            var umpires=0;
            for(var i = 0; i < this.state.Player.data.length; i++){
                if(this.state.Player.data[i].Is_Umpire === 1){
                    umpires++;
                }
            }

            //Number of players
            this.setState({ infobox3: totalplayers-umpires-1});
            //Number of umpires
            this.setState({infobox5:umpires})

    }

    databox_6_7 = () => {

        let fours = 0;
        let sixes = 0;
        if(Object.keys(this.state.BallByBall).length !== 0){
            this.state.BallByBall.data.forEach(e => {
                if(e.Batsman_Scored === 4) {
                    fours++;
                }
                else if(e.Batsman_Scored === 6) {
                    sixes++;
                }
            });

            // Number of Fours
            this.setState({ infobox6: fours});
            // Number of Sixes
            this.setState({ infobox7: sixes });
        }

    }


    render() {

        return (
            <div className='content'>
                <div className='heading' style={{textAlign:"center",padding:"25px 25px 0px 25px"}}>
                    <h1><span style={{fontWeight:700,marginTop:"0px",marginBottom:"0px",color:"#424A52"}}>Indian Premier League Statistics and Data Visualization</span></h1>
                </div>

                <div className='infoboxes'>
                    <Infobox 
                        data={this.state.infobox1} 
                        title='Total Seasons' 
                        text='Total Number of Seasons Organized.'
                    />
                    <Infobox 
                        data={this.state.infobox2} 
                        title='Total Matches' 
                        text='Matches played till now.' 
                    />
                    <Infobox 
                        data={this.state.infobox3} 
                        title='Total Players' 
                        text='Total Number of Players played till now.'
                    />
                    <Infobox 
                        data={this.state.infobox4} 
                        title='Total Superovers' 
                        text='Number of draw matches till now.'
                    />
                    <Infobox 
                        data={this.state.infobox5} 
                        title='Total Umpires' 
                        text='Total Number of Umpires till now.'
                    />
                    <Infobox 
                        data={this.state.infobox6} 
                        title='Total Fours' 
                        text='Number of balls going for four.'  
                    />
                    <Infobox 
                        data={this.state.infobox7} 
                        title='Total Sixes' 
                        text='Number of balls going for six.'  
                    />
                    <Infobox 
                        data={this.state.infobox8} 
                        title='Total Duck Worth Lewis' 
                        text='Number of times match is affected by rain or other interruptions.'  
                    />
                </div>

                <div className='graph'>
                    <Charts 
                        selectChart='bar' 
                        displayLegend={false} 
                        chartData={this.state.chartinfo1} 
                        titleText='Toss Decision (Bat or Field)' />
                    <Charts
                        selectChart='pie' 
                        chartData={this.state.chartinfo3} 
                        titleText='Result' 
                    />
                    <Charts
                        selectChart='bar' 
                        displayLegend={false}
                        chartData={this.state.chartinfo2} 
                        titleText='Host Countries' 
                    />
                    <Charts
                        selectChart='pie' 
                        chartData={this.state.chartinfo4} 
                        titleText='Right / Left Handed Batsman' 
                    />
                    <Charts
                        selectChart='horizontalBar' 
                        displayLegend={false} 
                        chartData={this.state.chartinfo5} 
                        titleText='Bowling Skill Types' 
                    />
                    <Charts 
                        selectChart='line' 
                        displayLegend={false} 
                        chartData={this.state.chartinfo6} 
                        titleText='Players Nationality' 
                    />
                    <Charts 
                        selectChart='horizontalBar'
                        displayLegend={false} chartData={this.state.chartinfo7} 
                        titleText='Players Dismissal Types' 
                    />
                    <Charts
                        selectChart='horizontalBar'
                        displayLegend={false} chartData={this.state.chartinfo8} 
                        titleText='Cities Hosting Matches' 
                    />
                </div>

            </div>
        )
    }
}

export default DataContent;
