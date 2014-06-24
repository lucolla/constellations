/**
 * Created by chu on 6/18/2014.
 */

// [constName,xLeft,yTop,width,height,filePath]
//var trsnsparentcConstellationsPath='./Pictures/tiletrialforsomeillustrations/';

/*
 var trsnsparentcConstellationsPath='./Pictures/transparentConstellations/';

var constellationsArr = ['andromeda.png',
'aries.png',
'auriga.png',
'cancer.png',
'canis-major.png',
'cassiopeia.png',
'cetus.png',
'columba.png',
'fornax.png',
'gemini.png',
'girafe.png',
'hydra-cup-raven.png',
'leo-major.png',
'leo-minor.png',
'lepus.png',
'lynx.png',
'monoceros.png',
'orion.png',
'pegasus.png',
'perseus.png',
'pisces.png',
'puppis.png',
'pyxis.png',
'taurus.png',
'triangulum.png',
'ursa-major.png'];

*/


/*

var constellationsArr = [

    ['cancerConst',1690,2189],
    ['canisConst',2286,3146],      //513,571
    ['rabbitConst',2799,3171],
    ['perseusConst',3323,1327],
    ['lambConst',3696,2179],
    ['cetusConst',4006,2791],
    ['doveConst',2669,3761],
    ['orionConst',2704,2327]        //554,994
];
*/

var trsnsparentcConstellationsPath='./Pictures/const6/';
var titlePath = './Pictures/alltitlesforthemap/';
var animatioonConstPath='./Pictures/const6/animationsConst';

function initializeConstellationsNames(){

    var constellationsNameArr = [
//            'const6__0002s_0000_ursa-major_412-px_1180-px.png',
            'const6__0002s_0001_leo-major_746-px_2178-px.png',
            'const6__0002s_0002_leo-minor_1093-px_1871-px.png',
            'const6__0002s_0004_fornax_3631-px_3251-px.png',
            'const6__0002s_0005_columba_2576-px_3437-px.png',
            'const6__0002s_0006_cetus_3727-px_2502-px.png',

/*
            'const6__0002s_0008_pisces2_4135-px_2567-px.png',
            'const6__0002s_0009_pisces_4186-px_2042-px.png',
*/
            'const6__0000_0009_pisces_4135-px_2042-px.png',

            'const6__0002s_0010_pegasus_4184-px_1871-px.png',
            'const6__0002s_0011_cancer_1619-px_2155-px.png',
            'const6__0002s_0012_girafe_2603-px_341-px.png',

/*
            'const6__0002s_0014_Layer-46_4714-px_1708-px.png',
            'const6__0002s_0015_andromeda_3974-px_1388-px.png',
*/
            'const6__0001_0015_andromeda_3974-px_1388-px.png',

            'const6__0002s_0016_perseus_3318-px_1334-px.png',
            'const6__0002s_0017_monoceros_1953-px_2599-px.png',
            'const6__0002s_0018_canis-major_2262-px_3109-px.png',

            'const6__0002s_0020_auriga_2466-px_1379-px.png',
            'const6__0002s_0021_lepus_2766-px_3162-px.png',
            'const6__0002s_0022_lynx_1645-px_1243-px.png',


            'const6__0003_0023_triangulum_3938-px_2017-px.png',

            'const6__0002s_0025_pyxis_1631-px_3460-px.png',
            'const6__0002s_0026_puppis_1841-px_3271-px.png',
            'const6__0002s_0027_gemini_2030-px_1949-px.png',

            'const6__0002_0027_eridanus_2942-px_2820-px.png',
            'const6__0001_0027_cepheus_3237-px_244-px.png',
/*
        'const6__0002s_0023_orion_2644-px_2237-px.png',
        'const6__0002s_0019_taurus_2844-px_2184-px.png',
        'const6__0002s_0013_cassiopeia_3997-px_793-px.png',
        'const6__0002s_0007_aries_3722-px_2198-px.png',
        'const6__0002s_0003_hydra-cup-raven_0-px_2541-px.png',
        'const6__0002s_0000_ursa-major_412-px_1180-px.png',
*/

// a new pisces?            'const6__0000_0000_pisces_4135-px_2042-px.png',
            'const6__0000_0000_ursa-major_412-px_1142-px.png',
            'const6__0001_0000_aries_3722-px_2119-px.png',
            'const6__0002s_0003_hydra-cup-raven_0-px_2541-px.png',
            'const6__0002s_0013_cassiopeia_3997-px_793-px.png',
            'const6__0002s_0023_orion_2644-px_2237-px.png',
            'const6__0002_0000_taurus_2844-px_2184-px.png'

    ];
    var item,splitted;
    for (var jj=0;jj< constellationsNameArr.length ; jj++){
        splitted = constellationsNameArr[jj].split('_');
        item = [splitted[4],splitted[5].replace('-px',''),splitted[6].replace('-px.png',''),constellationsNameArr[jj]]; //constName,xLeft,yTop,filePath,filename
        constellationsArr.push( item );
        console.log('loaded:'+item.join());
    }
}

function initializeAnimationConst() {

    var animatioConstArr = [
        //'const6__0000_0000_pisces_4135-px_2042-px.png',
        'const6__0000_0000_ursa-major_412-px_1142-px.png',
        //'const6__0001_0000_aries_3722-px_2119-px.png',
        'const6__0002s_0003_hydra-cup-raven_0-px_2541-px.png',
        'const6__0002s_0013_cassiopeia_3997-px_793-px.png',
        'const6__0002s_0023_orion_2644-px_2237-px.png',
        'const6__0002_0000_taurus_2844-px_2184-px.png'
    ];


    var item, splitted;
    for (var jj = 0; jj < animatioConstArr.length; jj++) {
        splitted = animatioConstArr[jj].split('_');
        item = [splitted[4], splitted[5].replace('-px', ''), splitted[6].replace('-px.png', ''), animatioConstArr[jj]]; //constName,xLeft,yTop,filePath,filename
        animationConstellationsArr.push(item);
        console.log('loaded:' + item.join());


    }
}





function initializeTitleNames(){
    var titlesNameArr=[
            'const6__0000_gemini-title_1999-px_2013-px.png',
            //'const6__0001_hydra-title_1194-px_2985-px.png',
            'const6__0002_andromeda-title_4801-px_1778-px.png',
            //'const6__0003_taurus-title_3356-px_2309-px.png',
            'const6__0004_puppis-title_1981-px_3857-px.png',
            'const6__0005_monoceros-title_2304-px_2617-px.png',
            'const6__0006_canis-major-title_2260-px_3111-px.png',
            'const6__0007_auriga-title_2911-px_1375-px.png',
            //'const6__0008_orion-title_2819-px_2488-px.png',
            'const6__0009_canis-minor-title_1978-px_2611-px.png',
            'const6__0010_cancer-title_2042-px_2385-px.png',
            'const6__0011_lynx-title_1983-px_1498-px.png',
            'const6__0012_lepus-title_2859-px_3386-px.png',
            'const6__0013_columba-title_2801-px_3886-px.png',
            'const6__0014_girafe-title_2556-px_472-px.png',
            'const6__0015_aries-title_3770-px_2119-px.png',
            'const6__0016_pisces-title_4267-px_2606-px.png',
            //'const6__0017_crater-title_672-px_2960-px.png',
            'const6__0018_cetus-title_3826-px_2876-px.png',
            //'const6__0019_cassiopeia-title_4429-px_883-px.png',
            'const6__0020_pegasus-title_5303-px_2682-px.png',
            'const6__0021_perseus-title_3527-px_1301-px.png',
            'const6__0022_fornax-title_3632-px_3543-px.png',
            //'const6__0023_ursa-major-title_853-px_1142-px.png',
            'const6__0024_leo-major-title_1052-px_2265-px.png',
            'const6__0025_leo-minor-title_1330-px_1834-px.png',
            'const6__0026_pyxis-title_1584-px_3426-px.png'
            //'const6__0027_triangulum-title_3938-px_2050-px.png'
            //'const6__0028_corvus-title_471-px_3170-px.png'
    ];
    var item,splitted;
    for (var jj=0;jj< titlesNameArr.length ; jj++) {
        splitted = titlesNameArr[jj].split('_');
        item = [splitted[3], splitted[4].replace('-px', ''), splitted[5].replace('-px.png', ''), titlesNameArr[jj]];
        titlesArr.push(item);
        console.log('loaded: ' + item.join() );
    }
}