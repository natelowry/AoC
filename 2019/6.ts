// --- Day 6: Universal Orbit Map ---
// You've landed at the Universal Orbit Map facility on Mercury. Because navigation in space often involves transferring between orbits, the orbit maps here are useful for finding efficient routes between, for example, you and Santa. You download a map of the local orbits (your puzzle input).

// Except for the universal Center of Mass (COM), every object in space is in orbit around exactly one other object. An orbit looks roughly like this:

//                   \
//                    \
//                     |
//                     |
// AAA--> o            o <--BBB
//                     |
//                     |
//                    /
//                   /
// In this diagram, the object BBB is in orbit around AAA. The path that BBB takes around AAA (drawn with lines) is only partly shown. In the map data, this orbital relationship is written AAA)BBB, which means "BBB is in orbit around AAA".

// Before you use your map data to plot a course, you need to make sure it wasn't corrupted during the download. To verify maps, the Universal Orbit Map facility uses orbit count checksums - the total number of direct orbits (like the one shown above) and indirect orbits.

// Whenever A orbits B and B orbits C, then A indirectly orbits C. This chain can be any number of objects long: if A orbits B, B orbits C, and C orbits D, then A indirectly orbits D.

// For example, suppose you have the following map:

// COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// Visually, the above map of orbits looks like this:

//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I
// In this visual representation, when two objects are connected by a line, the one on the right directly orbits the one on the left.

// Here, we can count the total number of orbits as follows:

// D directly orbits C and indirectly orbits B and COM, a total of 3 orbits.
// L directly orbits K and indirectly orbits J, E, D, C, B, and COM, a total of 7 orbits.
// COM orbits nothing.
// The total number of direct and indirect orbits in this example is 42.

// What is the total number of direct and indirect orbits in your map data?

// Your puzzle answer was 417916.

// The first half of this puzzle is complete! It provides one gold star: *

// --- Part Two ---
// Now, you just need to figure out how many orbital transfers you (YOU) need to take to get to Santa (SAN).

// You start at the object YOU are orbiting; your destination is the object SAN is orbiting. An orbital transfer lets you move from any object to an object orbiting or orbited by that object.

// For example, suppose you have the following map:

// COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN
// Visually, the above map of orbits looks like this:

//                           YOU
//                          /
//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I - SAN
// In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required:

// K to J
// J to E
// E to D
// D to I
// Afterward, the map of orbits looks like this:

//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I - SAN
//                  \
//                   YOU
// What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)

// Although it hasn't changed, you can still get your puzzle input.

// 523

const input6 = ["36S)VWN", "6FM)RNW", "S2M)329", "DQ3)5CD", "XYW)X2Y", "LFS)LXR", "SMP)C57", "2YY)MSP", "4TM)DPK", "PZQ)77L", "SNX)Y6Q", "JSS)T26", "KDF)PR8", "SNM)XBG", "46X)P5S", "CPN)C93", "VXL)ZHS", "B9V)XZN", "B6X)H3Y", "234)FHY", "BZY)L3T", "6YT)Q53", "JK6)RC4", "TW9)64K", "3VT)2GJ", "XKG)7L4", "ZM3)36S", "C2S)5T2", "RYH)8Z1", "YK6)G7K", "7YB)WQ7", "X7D)SNW", "8QS)ZRP", "HNX)812", "TN4)K68", "H6L)PFY", "69Y)1DT", "JKH)41K", "RDZ)S52", "DH8)4HT", "MH8)HB3", "NCR)PY1", "3L1)8Z9", "HRQ)BBC", "SNW)99L", "5VY)L15", "D69)9FP", "DRC)S4T", "NJV)MTR", "6ND)49Z", "RF1)82H", "329)Y37", "HCL)ZBZ", "Q47)ZVJ", "QDM)6QM", "DR8)KWZ", "M2N)PWL", "RLF)N2D", "41G)XTK", "5CF)CFW", "BBC)KYF", "SX1)G9C", "791)HQD", "9KV)MZC", "B6C)RBX", "Q5H)R7X", "488)4C5", "5D5)ZTC", "5ZK)G2C", "2HC)SMP", "CB2)91H", "F4T)J17", "VCJ)HZV", "G3D)LMX", "KMD)98B", "8Q2)MKP", "4BK)152", "M3H)57J", "SS3)BC7", "VP8)6MV", "ZDZ)W55", "997)5S5", "67Q)N7M", "PWL)BMZ", "D8V)PBJ", "KT4)RPQ", "D9G)69Y", "BWS)9SV", "3HV)K1J", "HZR)959", "WDT)15T", "SLW)C1P", "4VV)1Q4", "D6G)KBZ", "B7W)5QP", "6YL)TFD", "NHZ)XNK", "93V)K1N", "9PS)KTX", "LYZ)P92", "LTJ)JMP", "CJL)MW2", "L15)LF5", "MRL)PTW", "WNB)NK3", "TF2)KVF", "MF9)VFF", "J2G)V88", "GBR)NJJ", "CLZ)PRR", "ZLL)ZFB", "9JW)8G1", "SXK)ZQ8", "2VP)4XG", "ZQ8)288", "NQ3)61J", "79G)4ZM", "NL3)SD6", "R38)LCH", "SBX)4S2", "2VB)8C2", "ND1)3VP", "C93)NHM", "M8L)FL6", "FFV)M61", "5V5)FDH", "29D)ZYC", "32S)YL6", "YMY)DSJ", "3KS)3GK", "JZ5)X9Q", "F1P)3YV", "D6L)Q94", "Y77)8M4", "MZN)XD7", "Q7H)C78", "RCD)8KB", "QVD)NP7", "9NM)LRT", "4S6)67F", "H1W)9MH", "Z68)7LV", "75K)693", "38K)9ZG", "RZX)M3K", "XQW)WPK", "6L8)7LR", "RL8)NJH", "W9Q)7V7", "S4S)KR5", "R2F)4MX", "QCY)TY3", "8C2)Z68", "CFW)B7B", "6GV)CST", "3HG)N6V", "BNW)YQP", "WZZ)6YL", "6QT)39G", "8M4)ML1", "XW7)6XH", "YY6)3HZ", "KYF)6KB", "NMS)BVR", "V7M)ZZB", "152)2ZP", "7LD)CLM", "6K8)YCB", "8VS)96S", "7R5)8QJ", "YBS)BVQ", "H82)7SR", "JCL)CMP", "7XX)4BV", "WGM)WCS", "LDY)H1F", "KS3)2BT", "HKQ)JVY", "7RG)BWZ", "248)629", "HMJ)QN6", "L1J)BCJ", "JLV)G7P", "M61)S45", "Q8L)9B4", "HBX)K9Z", "TCV)NM4", "TBX)BQC", "JDG)3HS", "PLQ)DXW", "4WS)CR1", "PSK)CNM", "4HT)37C", "9L1)QL2", "LL4)LGQ", "W1V)91R", "JTF)W3M", "QVV)4TM", "K6C)4RM", "7F5)PDF", "QYV)MW8", "KBZ)WMV", "Q7H)NMS", "DZ9)7TV", "K82)D4Y", "YQP)ZDZ", "R8S)L8Y", "DTS)X8T", "CLG)5X3", "11F)GMT", "VMG)787", "63B)NVC", "S5Y)X5N", "5FV)MPK", "J6B)34Z", "25Y)DV9", "Q4R)D7F", "1R6)K1Q", "5T2)3PD", "YHR)C7V", "1B3)TGT", "F53)8JX", "6MV)4S6", "DQ3)QSG", "ZSF)Y5C", "SK9)FKR", "XD7)6H9", "8TY)3Z1", "WPK)F1X", "JD2)QBH", "HF3)5HX", "SJC)Q6T", "2WS)G4T", "MDJ)D84", "5ZN)JVT", "NV7)D8G", "Q8C)RYH", "XGB)M11", "Z4H)LXD", "G4T)NPV", "FZS)Q51", "VL3)17R", "9W2)THD", "6GP)H65", "8YK)WV7", "F8Y)2FF", "PR8)GDT", "N3J)FLX", "4TY)318", "7NV)213", "773)DGG", "HY6)W1J", "WJG)X1V", "279)8V3", "M1Z)FB4", "GHV)YF7", "WMW)2GY", "L9F)TS1", "PQ2)HZ2", "WQD)MG6", "8HR)27Z", "5V6)5V5", "BT1)RQ5", "2T9)3V9", "FDD)Q27", "FGP)9LY", "6QM)X38", "ZT2)QWP", "MZC)PVN", "R8G)2JS", "VRS)W3C", "6TQ)24L", "W1X)JJ3", "QVZ)HBN", "5JK)X57", "49Z)2CV", "XZN)ZN1", "G5Y)6K4", "KYW)255", "ZW2)3KB", "WRG)FN4", "QJ2)9CW", "RH2)V3K", "2HP)G7L", "3MS)3P9", "JD9)11F", "FLX)2ZY", "N4C)GJD", "VZV)8T9", "JRT)764", "KCK)SNP", "V8K)SK9", "46T)JCM", "H3N)FK2", "ZW4)1BP", "CLQ)7BR", "QSS)723", "VZY)K9J", "32W)Z6L", "PKC)XMM", "MGW)46X", "FT1)WPC", "6B4)C4W", "Z99)1Z6", "QB4)BT1", "9LQ)V4K", "1C2)4DN", "GHM)VS1", "YRQ)6QT", "XGV)DQW", "7WD)FG3", "ZV5)P84", "XR8)Y89", "WQP)5P9", "R4P)TTV", "5RP)5MJ", "DZR)QVZ", "D9R)DWV", "Y44)YSZ", "R23)6DK", "ZRP)GTP", "M7C)9FL", "HN9)NZX", "HWY)HSC", "7L4)YH3", "VJ5)YR2", "85G)65K", "KRN)T3J", "9JV)FVR", "3FV)QSW", "GMZ)K1R", "HSZ)HWY", "9DT)W14", "5KH)PLQ", "MXX)4YT", "T9P)8VW", "7V7)2N1", "733)C6C", "G5Y)7V3", "NGT)NZC", "2H6)FGY", "6TT)CSW", "K1Q)D6L", "9BN)HHH", "PDZ)4NK", "QZY)BZH", "JY9)NG4", "HX7)7TB", "F1X)NT5", "DKR)HN9", "HYQ)QV1", "T3X)HPW", "WR8)18C", "1XF)GT3", "NR3)D69", "ZN6)YFM", "NVX)2VP", "7CV)YHJ", "LLZ)BTM", "8LL)38K", "Y3X)Q1N", "GJD)VQ3", "MFR)V6R", "6RS)DXL", "1GH)L45", "62B)7FX", "HRJ)Z9Z", "3YQ)X8J", "CMP)TZP", "749)FWW", "D6P)KNG", "8D3)Y9B", "CLZ)GKN", "34Z)LLZ", "7W9)86N", "9PC)Y3X", "JHX)56F", "91P)2MZ", "LRQ)CLQ", "N2Z)R6N", "M64)NWV", "T1M)TPD", "Y9L)6DY", "JT5)V4Y", "DHH)C8V", "RNH)JB4", "Y5C)VK7", "36H)6L8", "T26)S7Q", "HHY)PPD", "4YT)8RK", "QZY)WSJ", "764)XMK", "7NT)W71", "7F5)9QN", "K96)V2L", "CCY)DYM", "3HG)YC9", "46X)YMC", "HW3)YKQ", "FGQ)B27", "CFZ)PY7", "ZN1)VHW", "Z68)Q83", "4WS)7F1", "TF3)HKC", "D4Y)TD2", "Z9Z)2HP", "Y8F)91P", "3ML)9NM", "6DK)HQM", "FDH)V5J", "N4Z)GD9", "86Y)597", "D4G)G7R", "16M)X2D", "72W)5QS", "WGT)DYT", "MTR)7QG", "GDF)VN5", "39G)8LL", "RBY)KQK", "P9G)WK3", "LTH)NV5", "SVY)LW1", "723)5N1", "NJH)8MQ", "1HF)KPV", "YCH)XGB", "8R2)JV3", "NPV)8Q2", "4YP)9BN", "YN6)DZR", "QJS)DHH", "77L)DXN", "JNN)FTQ", "YV5)JPS", "KKD)JRT", "6XH)CG8", "MJY)LNJ", "9T5)HJ3", "MZC)9S1", "JGN)TXD", "3VP)FN6", "RC4)75K", "Y37)69L", "5CW)T4L", "R4W)VWK", "FVL)ZW2", "LL2)2H6", "CMY)GRL", "1DT)YW6", "TV5)S5P", "8WR)717", "3V9)KN6", "RTL)3BZ", "LN4)54L", "TXF)MKH", "1WM)J65", "YFM)5NT", "JS6)7F8", "WNN)W6Z", "KVF)FFX", "CRJ)STR", "N1D)BZ2", "1KB)R4P", "C1S)626", "VS1)67Q", "JMP)7X5", "17K)GYC", "WPK)72W", "4DN)641", "WC5)YRQ", "S6B)GXJ", "5N7)3VT", "3GK)SXK", "41G)K96", "WHJ)LRZ", "3PD)TXF", "7J9)PKC", "GS6)JX4", "736)2ZB", "FW5)2T9", "V88)YQX", "KVB)VX3", "4ZD)GYB", "JTK)MHK", "CCC)XXQ", "PXG)JCL", "PP2)Y7J", "SHY)XYX", "QBZ)MQW", "BCJ)F53", "7LR)HZQ", "SZX)41J", "RNW)K6N", "S2W)78F", "JLF)ZM3", "JV1)SXG", "WWR)WZS", "MXG)RFT", "HQD)GBR", "C8C)7NV", "F59)758", "T26)LX3", "62P)CLG", "HJ3)4KT", "33Q)DSD", "ZHS)DXK", "6RY)QK8", "3H7)414", "GYC)ZQH", "65K)YHV", "L8L)D6P", "MJS)H5K", "7ML)834", "VW4)Q6W", "PVM)6Q3", "5Z2)2LS", "1B5)RNH", "318)JHH", "T3J)5FV", "CXK)MRW", "7GK)KT4", "YX8)26Z", "8J9)3T2", "DWV)N88", "9T9)BSS", "HN6)L9F", "9TH)7J9", "RR2)MSS", "V5F)QSS", "J2R)1W8", "PLT)DX7", "GFL)N73", "PVN)KN2", "96L)NGT", "8M7)JGW",
    "YW6)92B", "9V7)4W7", "SKL)GHM", "94K)6H2", "XBH)1WD", "8DS)QKH", "HJP)BKD", "27Z)X36", "9CR)5ZN", "XYD)SXC", "NYH)VMB", "TCC)3ML", "4BV)2JY", "5QP)7NT", "WMX)B7W", "SLQ)7RR", "7SC)R5N", "ZNY)W5C", "656)T84", "VM1)JZ8", "H2X)NHD", "3RQ)MPG", "7WF)T44", "268)C2S", "W7D)9YD", "DWF)8BB", "TZ2)BK3", "R17)DQT", "MRW)K9L", "8MQ)W1K", "L4V)6FM", "SWR)FNL", "PMB)J2G", "N4X)3YT", "NP7)KS3", "DXN)WFH", "3BZ)JD9", "QCD)W5J", "P22)B9V", "NR1)WX7", "G42)CMW", "SS6)KY6", "D84)X97", "QV1)8DS", "TQM)VJX", "4VB)JHX", "4WM)9TT", "T8H)K2G", "Q72)H6L", "QN6)Y7K", "C4M)YY6", "W8P)WYP", "NCC)31C", "HVZ)93C", "Y13)XXZ", "93V)QXS", "NRL)9J8", "JZW)FW3", "BVR)16M", "W5C)XC5", "XC5)HJF", "4PG)FFW", "TWM)C9R", "MNG)GHV", "V5F)FC2", "RBJ)JXR", "94W)1KD", "SYP)TQR", "T84)MTZ", "T1F)7XK", "ZFX)F7Q", "GT3)X4X", "YHB)V16", "SQZ)8QS", "FGY)5FJ", "N2D)N4C", "P84)72Z", "MYP)6LP", "717)J1Q", "3V8)8D9", "7ZP)RM7", "PK9)HTS", "6J1)RWN", "CCC)V2X", "L14)92M", "91H)VTN", "MCF)G5Y", "9R5)LCZ", "CR1)P9M", "15T)2WS", "7XK)V8S", "J8T)D3P", "TVD)4YP", "PTC)K7P", "L82)6RD", "N6V)FSX", "5TH)C9H", "HY9)52F", "249)VXL", "LRQ)SCP", "FHK)RQQ", "Y3J)F5Q", "4LH)9Q9", "MW2)BHT", "JBS)1B3", "D3P)BK8", "G7R)FW5", "HPW)Z3T", "TT6)L8L", "2FY)CLZ", "V8T)T97", "P2G)W9Q", "144)SRL", "MHK)H3P", "Q35)FQ5", "V3K)BZY", "TQP)V7V", "HF6)LWB", "BZ9)L4V", "GRS)BDM", "45R)YBS", "5SF)4BG", "FPF)CG7", "R4R)K6C", "D5P)9BC", "9XJ)GBV", "B5L)T59", "D82)K93", "R6D)KKW", "XXQ)F9N", "SNP)M74", "BXC)TQM", "81T)CHD", "213)8M7", "RQQ)H4G", "NZT)7QP", "6KB)85G", "93C)DVQ", "P7F)2FY", "N3Z)QS4", "PVT)FGQ", "JB4)VCJ", "QFS)1B5", "NH3)1KF", "DPH)FL2", "GTP)FR4", "G8M)WWD", "FB6)ZNS", "842)PMB", "GBV)46N", "YC9)1Y8", "FL2)HLY", "DPK)3TJ", "8QJ)6BY", "C1P)ZRH", "9Q9)TVB", "W14)WLW", "XWR)972", "7V7)NVX", "H9X)ZZ8", "BYG)YSK", "FDD)3H1", "5WQ)NZ5", "ZLD)7CV", "4RZ)1GV", "V8C)N2G", "N2J)VX8", "TBK)TWM", "M3K)W1V", "G85)T14", "N5L)RTT", "6ZZ)54W", "8N1)7W3", "42N)R73", "54W)9FV", "7TS)HD6", "S45)HZG", "KQK)BMQ", "8V5)F91", "M3J)HM9", "W54)268", "DV9)JDT", "63D)GMZ", "6B3)8V5", "KNV)RFX", "JH5)MK3", "YQQ)Q7Y", "V9W)5LX", "KZK)4VB", "RXX)YNY", "NM4)XZR", "ZBZ)33Q", "ZW7)279", "QKH)DP7", "6KQ)WL9", "3Q3)9TH", "9QN)7X9", "9YD)RLF", "FB4)Q5H", "8S3)XTC", "CLV)P4L", "FP1)N1D", "GKN)CNT", "X8J)8KK", "V5H)T8M", "Y4L)H4W", "BXZ)DRZ", "6VP)6HP", "1BP)BDJ", "GLB)71J", "Q4P)VD7", "YKQ)XWZ", "YRY)V5S", "T5L)V15", "2LS)4R8", "2Z3)7FZ", "JVY)7LD", "C4W)QFS", "T94)P9G", "S2Q)FTC", "K36)9XL", "RR5)43C", "7TB)NLQ", "8BN)56N", "M7Y)H6V", "PFY)96L", "NB3)51P", "TTR)BKW", "PLT)HZR", "PZQ)563", "HTW)Q6J", "CB9)J7C", "3YV)4PG", "LCZ)7YB", "HW4)YHB", "95K)J8K", "Q3F)YGH", "R82)Q35", "4LQ)54X", "1FB)22B", "W5J)JSJ", "GY8)JKH", "N7Z)TTS", "B7B)VLB", "LX3)8XL", "T5L)KKG", "G2C)NWH", "T8M)W24", "KJ5)LFS", "SQP)RNF", "Y6Q)PSL", "SR9)XBH", "YDF)HL4", "22B)XKP", "V5H)81T", "1CN)L5B", "JPX)T62", "RPQ)H82", "ZBG)462", "TKG)WMW", "KRQ)R6S", "1KD)NN4", "XTW)L14", "FN6)D67", "JD5)RL8", "GD9)GQ8", "67F)RJX", "Y4J)23M", "YHV)WKJ", "5XR)VJ5", "NZ5)3TH", "2ZP)313", "78F)K98", "N1L)RR5", "5X4)814", "MKR)C8C", "NYY)1R4", "J7J)JZW", "P9Y)Q47", "VNS)XDG", "4VB)YMY", "LZR)LTH", "J2N)Z5P", "56N)VNJ", "QC6)XVY", "8J4)KWP", "JLP)5V3", "4PP)Q5M", "CR1)R17", "VQC)CPN", "K6N)CTX", "75G)G1T", "3V1)QDM", "3V4)XHD", "BVQ)9CR", "5NT)MXV", "1R4)G98", "XZN)5C5", "M7Y)Y1D", "Q5M)HVK", "R31)LLL", "T62)7R5", "6PY)X6G", "4RM)RH2", "BRS)DCV", "3L5)YDF", "F55)GR2", "HVN)9RJ", "K7P)CRD", "9V7)3MQ", "284)736", "CRD)BWF", "N5J)C75", "L21)BGB", "91R)C1S", "9B4)777", "HL9)Y13", "4RY)NR1", "N73)937", "DV9)3H7", "8NZ)CRJ", "YR2)Y4J", "ZN6)HSZ", "S52)L1J", "XKP)72F", "7M7)MXG", "YQX)KCK", "Q6S)2MT", "VK7)1V3", "M8R)JY9", "KKG)WC5", "T97)L47", "KP2)HGF", "NJJ)R4R", "W55)QCD", "RHJ)P7F", "XTC)TC1", "QSG)WZZ", "GWZ)YX8", "9J8)JG8", "LGQ)KVJ", "T6B)XZ7", "PRR)XTW", "MC4)8YL", "42Y)V1M", "43X)8NZ", "NYS)1KB", "Q1N)B5L", "61J)SQZ", "QL7)6S8", "9X9)YZH", "BMC)WMX", "HZV)3MS", "MSP)FGP", "MCN)VDT", "SJL)XDV", "KQ1)GNT", "YX7)BN4", "MKP)SX9", "1W8)1DF", "VNJ)N3Z", "YT8)8QV", "JPS)VF2", "G7P)KGY", "4ZD)MDX", "HHS)THP", "WCS)5SD", "N63)RTL", "4ZG)YQQ", "ZRH)HRQ", "5P6)MMY", "MMY)V4N", "Q27)M3F", "J65)VH7", "JHH)NHZ", "X4V)W5L", "2H6)NP4", "XH5)48R", "X61)656", "WQ5)BV7", "4FH)TQP", "DMF)WZ3", "CHD)PP2", "7FX)TJT", "92B)2GG", "37C)ZV5", "H3P)N4Z", "MJF)842", "F8H)ZGB", "XRS)MPT", "7BR)BYF", "FCT)SB9", "NV3)Z4H", "SQM)WHJ", "4NB)FJ7", "HMD)R38", "VC7)HFT", "31C)57K", "RX2)SWR", "H65)GXT", "23M)8ZQ", "PWL)VFB", "FW3)79G", "57K)TZ2", "7TV)1MS", "FV1)VF7", "W55)RCJ", "TS1)P22", "W5X)XZX", "Z9H)9ZV", "8XQ)9KP", "L8Y)6KL", "5LX)FD3", "DZV)ZQ4", "8MK)46T", "3FV)V6G", "RFT)MG8", "41K)2HC", "YC4)M7B", "QWP)HYK", "DYF)WP2", "VXJ)D7Y", "BYG)VQ2", "V6G)SQ3", "17K)248", "9XL)DVV", "WWD)QM4", "HG1)Q4R", "C2H)Q3F", "2MT)YOU", "V16)17K", "PTW)XQW", "46N)D3L", "VM1)ZW4", "SKY)SF8", "LLL)H48", "SX9)784", "17R)HGT", "S27)GY8", "G7V)7WD", "24C)RBY", "HHV)4NB", "WVX)TCC", "FC2)36H", "NHT)63D", "XXW)7ML", "FG3)BMC", "FVD)FN1", "GFG)1JY", "X6G)CMY", "BGB)DR8", "ZTC)2G7", "9HF)T9P", "MWN)W54", "JSJ)SX1", "XWZ)SLW", "H2N)RX2", "C7S)YNS", "6K7)X4Y", "V83)N68", "V9T)R4W", "YMC)HRJ", "T94)NR3", "6H1)YT8", "GW8)T94", "FQ5)62P", "CNM)N8R", "TJ4)G3D", "X34)N2J", "JHJ)G3C", "NSG)1CN", "QKZ)873", "RC4)1HF", "BL4)TKG", "JH2)D6C", "716)N5B", "CD6)YV5", "NZC)4LH", "5X3)5W3", "BY2)TKD", "3H7)SMW", "K1J)J6B", "Q51)BZW", "N6J)6Q5", "MPG)6XK", "VBG)R7V", "MLP)L82", "STK)WNN", "WSJ)JW1", "QDD)LWS", "DG3)JRQ", "TVV)8G8", "LL2)NSZ", "5V4)YP4", "WDH)GZG", "937)JK6", "H6V)B95", "VFB)DPN", "CQW)V7M", "W5X)RCD", "ZNS)WWR", "6DY)CV6", "NWV)7F5", "8TV)445", "92M)HVN", "XW7)VXJ", "V2L)135", "KPV)836", "H3H)SMB", "WKJ)WDH", "678)TF2", "D12)8YK", "7X9)MXX", "NYH)VTH", "5GM)JS2", "KLY)HYQ", "G7L)DZ9", "WRG)D47", "8YL)K7F", "7RG)YGR", "641)G85", "Z1M)R8T", "XDG)SHY", "V5Y)Z76", "BN4)JZ5", "QLD)XPW", "3SS)GD6", "X2Y)HY6", "QTM)FHK", "FPW)HG1", "SQ3)WR8", "VF7)1NN", "CQD)V8W", "HJF)GTM", "MF1)7BP", "C7V)2C2", "FHY)QTM", "RL8)PZQ", "ML1)HY9", "VVK)8QH", "7LN)QYQ", "WDG)855", "9ZV)KMV", "597)87V", "R5B)3L1", "RM6)6B3", "VN5)WSR", "CLM)MF1", "MG8)YK6", "TQP)PVM", "3S1)5GR", "Q5D)GWZ", "ZW4)3V1", "4JF)D12", "JBY)MD5", "C75)R6R", "RWN)5P6", "5P9)MNG", "2TK)G68", "C6C)CB2", "6K4)MP2", "K7F)DZ4", "959)NRL", "3H1)FQQ", "MRL)YFX", "W3M)9X9", "TM6)VNS", "TY3)QYV", "TXJ)WVJ", "YCB)65X", "H4G)Z9H", "2ZY)SZR", "P31)X61", "9QN)K2W", "S71)GN7", "6GV)3HG", "418)2YY", "VNV)9T5", "T4L)N6J", "3YT)4VG", "1X3)6ND", "DCV)5WQ", "XXZ)75G", "H7C)4G2", "CB2)32S", "8HN)7FP", "HVP)MF9", "D47)V24", "HZY)G1S", "2GJ)WGT", "FFX)R4T", "R6N)444", "XWY)G42", "TJT)13B", "THD)Y5P", "L47)KTF", "PKS)7XX", "GC9)BKL", "D6C)2W3", "J9G)395", "XNR)T7S", "YQ7)VL3", "FBJ)R31", "5FJ)JBS", "XX7)LRQ", "LF5)MJY", "GR3)8S3", "S4T)X7D", "HQX)MC4", "KVJ)3NK", "L14)W2B", "Z2S)XMG", "24L)4SK", "VJX)K5W", "SXC)4VV", "FTQ)R5S", "YDB)Y3J", "C9N)YBP", "L36)9PC", "FKR)QQ1", "8T9)LCM", "S7Q)C3T", "2N1)9JW",
    "YSZ)XXW", "LWS)DQ3", "H1F)24C", "LNJ)YFD", "7V3)5V6", "XDW)RPJ", "814)M64", "9SV)GJ4", "NHD)M2R", "HB3)KR8", "4BG)SYP", "W71)T7N", "CG7)T1M", "VFF)21F", "L8Y)H2N", "N68)3NV", "L63)MKR", "9RJ)81G", "F5Q)LJJ", "25B)SJL", "TJ4)LZR", "KZD)N7Q", "5V3)7W9", "MD5)X4C", "D6P)NV7", "6H9)CLV", "3NK)3L6", "5S5)XW1", "J2R)RXX", "2KN)298", "7FZ)8N1", "VTC)5RG", "SJ8)571", "VQ2)GPR", "PY7)DKV", "MPC)54J", "2BT)H2X", "CSC)KDF", "LJ4)X3V", "V22)NHT", "ZVJ)8DW", "2FC)FCT", "PLR)5JB", "51J)KNV", "BYF)HW4", "JXR)KX7", "NV9)R23", "K8R)BSP", "96P)J52", "NB3)SQM", "JDT)KZD", "LWB)6TT", "5N1)QC6", "BGN)9V7", "QBH)P5T", "T14)4JF", "HM9)Y6K", "KR2)6ZZ", "K87)JPX", "69N)5GV", "629)GYP", "BZW)YC4", "7PG)9R5", "PPD)RQ8", "NSZ)TW9", "G2H)WJG", "NP4)W5X", "FZ4)TCR", "X8T)XQY", "3L6)QZP", "N7M)ZR8", "V15)2GW", "6BY)4XL", "YCH)BNW", "DHQ)5SF", "5SZ)846", "F1V)ZT2", "82H)LTJ", "ZYC)H3H", "HHY)Q6S", "BKL)4XY", "XKY)RSY", "VTN)HVZ", "9TH)XNR", "6KL)S8G", "C78)J9G", "7QP)LN4", "VQH)W1C", "FN6)CSC", "BSP)NZT", "6RD)ZFX", "5VY)DZV", "HHH)95J", "B7K)JNN", "2MZ)DY1", "4SK)P5H", "HZG)TZD", "F9N)5Z2", "Q5H)8D3", "HVK)WQ5", "F7Q)2YV", "L5K)R2W", "Z6L)7GK", "P9M)H1V", "W5G)HL8", "5WQ)R8G", "CG8)QKZ", "6S8)SS3", "YML)2BC", "ZQH)B4Z", "84W)R2S", "YSY)6VP", "W3T)XLJ", "94W)G8P", "HGF)JH5", "XHD)HX7", "F6Q)R82", "4NW)J7J", "CV6)J8T", "TRG)XX5", "LW1)5GM", "956)5JK", "FVR)VW4", "4YT)716", "5NG)2FC", "GDT)S7D", "RPJ)YCH", "5ZZ)5KH", "54L)SWD", "KZ5)J3M", "3MQ)6X2", "HFT)F3Z", "455)F4T", "RWN)JHN", "TFD)N5L", "XW1)WS1", "2DH)KHP", "N2G)8WR", "V2V)WNQ", "Z4V)ZX3", "N59)FB6", "R7X)KZK", "TQC)59M", "CQ5)25B", "8KZ)N4S", "T1F)VP8", "C9H)6H1", "86N)DH8", "96S)23D", "ZB7)NCR", "7ZP)6L2", "PFG)9L1", "G98)6KQ", "846)GBD", "3NV)JLP", "LYM)LL2", "GPR)TL5", "7NR)GWR", "1Q4)583", "1DT)YRY", "WBW)JLF", "Z43)KHR", "72Z)Y44", "WQP)NC5", "26Z)PQ2", "11Y)4ZG", "KTX)DHZ", "98B)3SF", "H48)YSY", "V8N)SZX", "T3G)MG1", "FDJ)HHV", "56F)FQ9", "P7W)WNB", "WV7)SLZ", "53L)YXT", "LVR)M7C", "8V3)QCY", "JR1)HW3", "33Q)NGJ", "H3Y)6J1", "XLJ)PSK", "VHW)NBZ", "7LV)7NR", "27X)V9T", "213)CQD", "SD6)Z43", "PBJ)17Q", "R73)V5H", "MGX)9XV", "GTM)JHF", "KR5)W1H", "MJF)MFR", "R5N)GC9", "CJK)VNV", "FHK)XVL", "LF8)1L4", "RM7)HHY", "M6H)PXG", "XMM)BXZ", "7BP)T6Y", "LXD)7PG", "48R)XRS", "6Q3)51J", "TZD)SQP", "7ZL)F55", "M64)NYY", "FBJ)F72", "2GW)F1P", "444)HBX", "V1M)84W", "D8V)VRS", "QLX)8HR", "NZ7)LJD", "HT8)B6X", "F91)S27", "9MH)XT4", "FGB)JLV", "6XH)1XF", "23K)ZDP", "834)RM6", "GJ4)818", "XJD)7SC", "13N)D4G", "HGS)P2G", "TWB)DWF", "KT9)GH6", "YHB)36R", "FWW)7DR", "H9N)HTG", "C1V)QX5", "J3M)KT9", "SLZ)1GH", "ZYD)K55", "BDJ)C4L", "395)TBX", "J8K)4C2", "8G1)WDG", "TZD)3XG", "MXV)HF6", "P5T)NV9", "MHG)4D2", "V2X)DTS", "1Z6)1WM", "BC7)GW8", "NV5)4ZD", "26Z)PLT", "FR4)GS6", "1DF)TNP", "NLQ)MPC", "ZFL)45R", "Z3T)7WF", "3P9)P9Y", "V7V)2QT", "X3M)ZBG", "XMG)HT8", "ZSJ)HS1", "TCR)V9W", "VTH)TBK", "BTM)WBW", "27X)BS6", "WNQ)HTW", "BQC)SJ8", "GCM)WVX", "SB7)MJF", "X9Q)YQ7", "D6K)MRL", "HSZ)F8F", "BWS)PKS", "9KP)9W2", "43C)DWN", "KN2)GZQ", "G1L)NXL", "TCL)8TY", "BKW)B21", "M82)9DT", "B27)GLB", "JDG)F26", "99X)Y9L", "566)CQW", "MPK)SLQ", "WL9)956", "N13)653", "SWS)JR1", "N35)29D", "QVK)J2R", "4C2)P8F", "C1S)4TY", "YF7)6RS", "BDM)YX7", "9TY)ZYD", "TPD)8XQ", "DYM)JPR", "TKD)TWB", "WVJ)N4X", "41J)KSY", "HTG)Q8C", "N8R)H9X", "XVR)RQM", "WSR)KMD", "S99)V83", "BS3)8VP", "QPH)23K", "3VF)S6B", "23D)76X", "827)9VC", "5GV)SDR", "635)FDJ", "RQM)8TV", "51Z)9VM", "NT5)95K", "F72)9FR", "YP4)7Y4", "G42)3N2", "PY1)CC3", "S4P)JRR", "7X5)566", "KR8)VS8", "13B)NZ7", "X4C)VQH", "VLB)BZM", "LCM)V3V", "K1R)9TY", "7K5)N13", "W1H)S2M", "V8S)635", "J1L)TRG", "ZR8)Q8L", "XPW)QRY", "XDV)997", "M74)VWG", "395)T7W", "QYV)RDZ", "8JX)4NW", "4C5)FZ4", "XVL)1C2", "WDT)FV1", "R2W)VQ8", "C4L)TV5", "N57)GQS", "9FR)QLX", "6C4)L5K", "F3Z)62B", "W9M)S3G", "JHH)7LN", "HBN)GYK", "DY9)CJK", "787)2Z3", "44V)LF8", "C3T)13N", "XTK)5ZK", "571)HL9", "TTQ)R9R", "VWK)MWN", "DYT)8ZN", "CCH)YCF", "JPJ)JHJ", "JHF)DKR", "SPP)FPW", "MKR)78L", "X8Q)C9N", "J1Q)SPP", "Y7J)YML", "2JS)F6Q", "56T)DHL", "3N2)6YT", "DF4)K82", "Y89)VR6", "59M)SZ2", "1MV)CTP", "626)Z2S", "7D7)L36", "V6V)H1W", "T7W)D3D", "WPJ)71N", "75G)XFP", "71J)HGL", "WK3)S3T", "SMW)QVK", "T3L)Y8F", "P84)NL3", "TF4)6GD", "KMK)FQC", "2QT)CXK", "8LL)PDZ", "4C2)32W", "5JB)Q4P", "4W7)5N7", "QZP)TQ2", "7QG)Q72", "SDR)LZH", "C9R)7ZP", "QXS)X2K", "D7Y)YYG", "9BC)4RY", "976)6TQ", "QL2)BXC", "ZXK)HQX", "D3D)6C4", "NK3)S2Q", "B95)SKL", "NN4)2VB", "NHT)1X3", "RHG)F8Y", "GRL)RS8", "2GY)41G", "D48)F4D", "2YV)3V8", "JC5)V8C", "T7S)TYM", "KRN)7K5", "K1N)RTD", "X97)MCF", "3TH)5XR", "MNG)MHG", "QX5)STK", "D82)D9R", "KNG)K36", "288)4FF", "W1G)LZN", "FJ7)TVV", "YXT)BVH", "RQ8)QB4", "5QS)7DY", "FZX)T5L", "BZ2)WRG", "GYP)X8Q", "NY3)N3J", "298)JS9", "KHR)JTK", "T7N)JC5", "2J7)KKD", "HL9)PDT", "XZX)WQP", "GXJ)T6B", "NHM)PCD", "R4T)JBY", "3SF)J2N", "MW8)9T9", "3YQ)D5P", "6J1)NC9", "VDT)4RZ", "9VM)FZQ", "G77)2TK", "YL6)H3N", "QSW)V4V", "GR2)KYS", "MPT)PTC", "N1L)D6K", "F8N)T1F", "K2W)R5B", "RC1)D9J", "PP2)WJ4", "JRR)V8N", "GZW)4LQ", "21F)2VL", "HQM)4XJ", "CNT)HH7", "7DY)ZGV", "FQC)L63", "972)JS6", "BK3)SWS", "9CW)4WS", "V5S)Q7H", "2WP)QX6", "C57)6GF", "BZH)GFL", "FK2)SJF", "NBZ)RBV", "4NK)CCY", "JRQ)QVV", "3HS)M7Y", "6HP)G77", "TNP)9LQ", "8G8)NH3", "DVQ)3V4", "K98)G2J", "BSS)JSS", "KGY)G8M", "SZR)2KN", "KWZ)NJV", "WJG)FPF", "F26)ZFL", "TVB)2M8", "445)KJ5", "RQ8)2P3", "SDR)XJD", "HL8)M82", "TLY)3YQ", "R16)249", "2CV)144", "L45)W7D", "P5S)R8S", "V3V)HNX", "G7K)X34", "W1V)DXZ", "HXJ)BVV", "TLY)7ZL", "BVH)CQ5", "QSG)GRS", "Q53)96P", "RCJ)TVD", "YGR)VC7", "P92)C2H", "D3D)N7Z", "NWH)XYW", "8XL)T3G", "824)3L5", "M3K)KLY", "QQ1)QJ2", "NXL)L21", "N88)KYB", "DWN)JT5", "TPW)NY3", "HGT)SVY", "LZH)SC2", "CP6)S1B", "51P)6RY", "GZ9)DHQ", "FSX)FGB", "NZX)KMK", "RMT)8BN", "71N)TQC", "BHT)NYS", "W1G)8J9", "LMG)K87", "SF8)CCC", "7DH)JD5", "59M)M6H", "V8N)JH2", "8KK)HVP", "R6S)42Y", "8Z1)5V4", "ZX3)69N", "VWN)GZW", "JCM)HKQ", "G61)M1Z", "6Q5)N91", "89H)CFK", "MW2)W5H", "M11)5F4", "YXV)HVW", "563)KQ1", "GBN)7TS", "LJD)TF3", "1TM)C1V", "RS8)5CF", "96S)XR8", "GZQ)NB3", "W5L)976", "BZM)TPW", "D67)488", "1JY)PLR", "DXK)B9Y", "7W3)3KS", "COM)N59", "2JY)M2N", "Y1D)DG3", "K1Q)H9L", "Y4J)7M7", "YMC)M8R", "S5P)GBM", "KN6)TXJ", "T44)L7C", "HK4)HGS", "P9R)3FV", "CTX)8J4", "N5D)H7C", "WZ1)1BF", "7Y4)6VZ", "LLZ)827", "JS9)S4P", "HLY)773", "8KB)RR2", "4VG)5NG", "87V)NL7", "1BF)HJP", "X4Y)MYW", "9LQ)VTC", "RNH)XWR", "ZFB)RC1", "KSY)MGL", "9PY)Z1M", "15Y)MYP", "LV3)614", "2C2)R6D", "8Z9)XH5", "HH7)FZX", "HGL)JGN", "HTS)XGV", "17Q)45Q", "J17)99X", "LMX)BY2", "GZG)YXV", "8D9)BRS", "18C)MZN", "DP7)VVK", "MXX)PFG", "P1K)9XJ", "99L)ZN6", "2G7)C4M", "GXT)W1G", "72F)4CC", "YFD)HZY", "65X)56T", "YR2)5SZ", "D3L)7NQ", "K9J)SJC", "Q83)9PS", "Z91)4T7", "W1K)KVB", "SJF)FVD", "ZG1)63B", "NV5)R16", "DHZ)FP1", "LZN)ND1", "Z2S)93V", "J8T)GZ9", "W3T)94W", "JG8)6QV", "MG1)W8P", "FNL)DYF", "255)RF1",
    "X38)BWS", "KX7)5ZZ", "9Y2)V22", "QBX)DXQ", "K93)N1L", "653)P31", "LR9)7FH", "9ZG)3PN", "V5J)CP6", "PDF)15Y", "ZQP)N35", "ZZ8)TCV", "NK3)FDD", "23K)N5J", "BK8)TLY", "S3G)HCL", "BS6)HK4", "W1J)3Q3", "D7F)X3M", "YWL)ZW7", "DVV)YHR", "K9Z)T8H", "5D5)HLB", "MYW)8R2", "J5M)ZLD", "1GQ)6T9", "L21)KRQ", "6GD)Y77", "MDX)R2N", "NC5)DR9", "K55)TFC", "YH3)P7W", "4FF)6S4", "BMZ)9PY", "P5H)XKG", "BV7)QBX", "135)PK9", "LZR)DPH", "N57)TM6", "VH7)XX7", "MPC)LYZ", "L5B)V6V", "JS2)BS3", "784)ZT7", "95J)D8V", "F91)4BK", "3TJ)43X", "6B4)LDY", "DR9)J5M", "3T2)CFZ", "5XK)5TH", "XKG)1SC", "M7B)D48", "DX7)G9P", "CST)DMF", "7ML)7D7", "TVM)YWL", "L47)G61", "XBC)W9M", "F4D)3SS", "JV1)T1T", "G1T)86Y", "3YP)JPJ", "DHL)G1L", "QYQ)9PL", "Z76)GFG", "NGV)TTR", "Q7Y)QL7", "BWF)M6M", "KN2)3RQ", "WYP)NZZ", "KY6)SB7", "JHN)19T", "836)NYV", "LXQ)KG6", "SKJ)XV2", "XVY)Y4L", "W3C)J1L", "Z5P)6B4", "78L)LMG", "X1V)S99", "JVT)5X4", "GD6)42N", "RDZ)S5Y", "4S2)CJM", "G1L)455", "HSC)733", "WZS)N6W", "W5H)ZQP", "QBZ)D82", "V24)K8R", "CSW)VMG", "X4X)VBG", "C8V)SAN", "YSK)LL4", "FLX)RKC", "GH1)234", "H5K)T3L", "JZ8)ZG1", "VD7)GR3", "WQ7)8KZ", "Y5P)RZX", "P4L)ZSJ", "VMB)32K", "Y7K)JD2", "LYZ)XW7", "JV3)CCH", "VX3)XWY", "XMK)P9R", "TYM)1TM", "J7C)DV8", "1KF)WQV", "TD2)G4H", "WJ4)XVR", "JW1)VM1", "DRZ)9KV", "ZWJ)TCL", "4D2)8VS", "5RG)W3T", "T6Y)NB5", "GYB)NSG", "414)1FB", "YRQ)M8L", "YYF)LJ4", "SB9)QJS", "V4K)B7K", "YZH)WGM", "YGH)1MV", "RTD)VZY", "HVK)VZV", "DXW)QDD", "4G2)MDJ", "R8T)VQC", "1KD)ZB7", "XFP)H9N", "Q72)XBC", "HDD)SS6", "JZ8)N2Z", "X3V)XYD", "FQQ)Z4V", "H9L)5CW", "R2N)LVR", "RKC)MJS", "NYV)3S1", "TRG)G5T", "XZ7)1R6", "6QV)P17", "WS1)6GV", "W2M)P1K", "1WD)5VY", "RBV)HF3", "GPR)4FH", "855)BP6", "W2B)LR9", "GN7)9JV", "BP6)4WM", "JGW)94K", "VWG)Q5D", "LXR)PJ7", "LZ1)HXJ", "WLW)NCC", "MCN)V5F", "5CD)RMT", "57L)LYM", "J52)QLD", "GBD)FBJ", "HZ2)51Z", "3Z1)DF4", "LRZ)8MK", "M2R)G7V", "G98)3VF", "NB5)JV1", "LL4)25Y", "6T9)6PY", "V4V)R8C", "F7J)BZ9", "HVW)V8K", "R6R)SNM", "53L)F1V", "R7V)WQD", "3VP)BFP", "SD6)SBX", "CQW)CJL", "ZGV)7RG", "STR)WPJ", "HZQ)R2F", "M6M)N57", "SCP)D6G", "G3C)DBX", "3XG)V8T", "MSS)F8H", "VT8)57L", "2W3)MGW", "QK8)HHS", "5HX)TN4", "FLZ)791", "9XV)3CB", "N6W)KZ5", "NJW)284", "4T7)SKJ", "36R)GBN", "FTC)V2V", "MQW)X4V", "FPW)G2H", "Q4R)8HN", "2FF)27X", "818)WDT", "81G)KR2", "H4W)MLP", "1R4)F7J", "V6R)WZ1", "3PN)N63", "DXL)W1X", "5KH)469", "V8W)NJW", "6H2)TF4", "TC1)GCM", "GZG)ZXK", "WMV)76P", "RQ5)FT1", "583)V5Y", "LRT)XDW", "S3T)824", "GQS)Z91", "YYG)KYW", "GH6)T3X", "4KT)SNX", "X5N)KP2", "HD6)NGV", "5W3)TVM", "SXG)JTF", "7NQ)2NX", "VQ3)NYH", "7FP)LZ1", "FL6)MH8", "MQW)51M", "GMT)FZS", "N13)BGN", "STR)MBF", "2P3)MGX", "NGJ)YN6", "B4Z)YYF", "127)PVT", "SMB)9Y2", "6LP)YDB", "V4N)S2W", "LMX)5RJ", "W1C)FLZ", "BFP)QXB", "BCJ)9HF", "9PL)FFV", "777)TTQ", "52F)11Y", "7F1)S71", "R4W)Y5R", "9FP)6JH", "S7D)6K7", "F3Z)LV3", "2GG)B6C", "6S4)MYX", "TTS)3YP", "KMV)MTG", "R8C)ZSF", "8RK)ZLL", "5F4)RHJ", "KYS)BL4", "19T)44V", "XWZ)VT8", "L7C)Z99", "BVV)QPH", "7DR)W5G", "1B5)RBJ", "1Y8)KRN", "57J)QVD", "S8G)FVL", "F8F)RHG", "RBX)GH1", "JX4)HDD", "G9P)D9G", "H1V)TT6", "51M)2DH", "7M7)TJ4", "XYX)678", "G5T)3HV", "758)BYG", "6GF)QZY", "MYX)JDG", "9S1)ZNY", "T59)NQ3", "CTP)NV3", "DBX)XKY", "8N1)4PP", "D6C)7DH", "2BC)QBZ", "CC3)C7S", "DQT)127", "RNF)53L", "ZQ4)2J7", "873)M3J", "XMK)MCN", "BC7)DRC", "4XY)89H", "8VW)5XK", "8BB)HMJ", "PJ7)GDF", "G9C)HMD", "6VZ)CB9", "32K)S4S", "CMW)ZWJ", "7SR)5RP", "W24)418", "6L2)F8N", "8QV)W2M", "TXD)M3H", "RBJ)749", "DSJ)SKY", "DY1)SR9", "VR6)6GP", "1GV)CD6", "S7D)DY9", "8QH)HPX", "GNT)5D5", "KG6)6K8", "DSD)HN6", "NG4)2WP", "N5D)1GQ", "X2K)F59", "45Q)LXQ", "L3T)N5D"];

// const input6 = [
//     "COM)B",
//     "B)C",
//     "C)D",
//     "D)E",
//     "E)F",
//     "B)G",
//     "G)H",
//     "D)I",
//     "E)J",
//     "J)K",
//     "K)L",
// ];

// const input6 = [
//     "COM)B",
//     "B)C",
//     "C)D",
//     "D)E",
//     "E)F",
//     "B)G",
//     "G)H",
//     "D)I",
//     "E)J",
//     "J)K",
//     "K)L",
//     "K)YOU",
//     "I)SAN",
// ];

const nodes = [];

for (let i = 0; i < input6.length; i++) {
    const [left, right] = input6[i].split(")");

    nodes[right] = nodes[right] || { label: right, orbitedBy: [], currentDepth: 0 };
    nodes[left] = nodes[left] || { label: left, orbitedBy: [], currentDepth: 0 };
    nodes[left].orbitedBy.push(nodes[right]);
}


function visit(node, currentDepth) {
    node.currentDepth = currentDepth;
    node.orbitedBy.forEach(element => visit(element, currentDepth + 1));
}

visit(nodes["COM"], 0);

let sum = 0;
for (const key in nodes) {
    if (nodes.hasOwnProperty(key)) {
        const element = nodes[key];
        sum += element.currentDepth;
    }
}

console.log(sum);

function findParentOf(nodes, label) {
    for (const key in nodes) {
        if (nodes.hasOwnProperty(key)) {
            const element = nodes[key];
            if (element.orbitedBy.filter(x => x.label === label).length) {
                return element;
            }
        }
    }
}

let currentNodeOnTheWayBackFromYou = nodes["YOU"];

const nodesOnTheWayBackFromYou = [];
while (currentNodeOnTheWayBackFromYou !== nodes["COM"]) {
    const parent = findParentOf(nodes, currentNodeOnTheWayBackFromYou.label);
    nodesOnTheWayBackFromYou.push(parent.label);
    currentNodeOnTheWayBackFromYou = parent;
}

let currentNodeOnTheWayBackFromSanta = nodes["SAN"];

const nodesOnTheWayBackFromSanta = [];
while (currentNodeOnTheWayBackFromSanta !== nodes["COM"]) {
    const parent = findParentOf(nodes, currentNodeOnTheWayBackFromSanta.label);
    nodesOnTheWayBackFromSanta.push(parent.label);
    currentNodeOnTheWayBackFromSanta = parent;
}

for (let i = 0; i < nodesOnTheWayBackFromYou.length; i++) {
    const element = nodesOnTheWayBackFromYou[i];
    const indexOfInSantasList = nodesOnTheWayBackFromSanta.indexOf(element);
    if (indexOfInSantasList !== -1) {
        console.log(i + indexOfInSantasList);
        break;
    }
}
