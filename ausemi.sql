/*
Navicat MySQL Data Transfer

Source Server         : yu
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : ausemi

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2014-08-18 09:21:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_agent
-- ----------------------------
DROP TABLE IF EXISTS `t_agent`;
CREATE TABLE `t_agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `agentContent` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_agent
-- ----------------------------
INSERT INTO `t_agent` VALUES ('6', 'Asia pacific:', 'Rightway Technology (HK) Limited', 'http://www.rightwaysemi.com', 'Hongkong Office: <br>\nTel:00852-26681868  <br>\nFax:00852-26681899<br>\nEmail:richardxia@rightwaysemi.com<br><br>\nShenzhen Office:<br>\nTel:86-755-21507756<br>\nFax:86-755-21508843<br>\nEmail:sales@rightwaysemi.com');

-- ----------------------------
-- Table structure for t_careers
-- ----------------------------
DROP TABLE IF EXISTS `t_careers`;
CREATE TABLE `t_careers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `careersTitle` varchar(255) DEFAULT NULL,
  `careers` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_careers
-- ----------------------------
INSERT INTO `t_careers` VALUES ('1', 'Careers', 'Careers<br>\nTEST');

-- ----------------------------
-- Table structure for t_culture
-- ----------------------------
DROP TABLE IF EXISTS `t_culture`;
CREATE TABLE `t_culture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cultureTitle` varchar(255) DEFAULT NULL,
  `culture` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_culture
-- ----------------------------
INSERT INTO `t_culture` VALUES ('1', 'Culture', 'Culture\n<br>\nTEST\nΩ');

-- ----------------------------
-- Table structure for t_hvmosfet
-- ----------------------------
DROP TABLE IF EXISTS `t_hvmosfet`;
CREATE TABLE `t_hvmosfet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hpartNo` varchar(255) DEFAULT NULL,
  `htype` varchar(255) DEFAULT NULL,
  `hvds` varchar(255) DEFAULT NULL,
  `hid` varchar(255) DEFAULT NULL,
  `hpd` varchar(255) DEFAULT NULL,
  `hvgs` varchar(255) DEFAULT NULL,
  `hrdstyp` varchar(255) DEFAULT NULL,
  `hrdsmax` varchar(255) DEFAULT NULL,
  `hpackage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_hvmosfet
-- ----------------------------
INSERT INTO `t_hvmosfet` VALUES ('5', 'aav', 'N', '600V', 'dfsΩΩΩΩΩ', 'vΩΩΩΩΩ', 'dΩΩΩΩΩc', 'ΩΩΩΩΩ', 'ΩΩΩΩΩ', 'dfsadsf');

-- ----------------------------
-- Table structure for t_lvmosfet
-- ----------------------------
DROP TABLE IF EXISTS `t_lvmosfet`;
CREATE TABLE `t_lvmosfet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vpartNo` varchar(255) DEFAULT NULL,
  `vtype` varchar(255) DEFAULT NULL,
  `vvdss` varchar(255) DEFAULT NULL,
  `vid` varchar(255) DEFAULT NULL,
  `vpd` varchar(255) DEFAULT NULL,
  `vvgs` varchar(255) DEFAULT NULL,
  `rdsontyp10` varchar(255) DEFAULT NULL,
  `rdsontyp4` varchar(255) DEFAULT NULL,
  `vpackage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_lvmosfet
-- ----------------------------
INSERT INTO `t_lvmosfet` VALUES ('1', 'aabb', 'P', 'ddbb', 'ffbb', 'fbb', 'ddb', 'ssbb', 'aabb', 'dffaad');

-- ----------------------------
-- Table structure for t_message
-- ----------------------------
DROP TABLE IF EXISTS `t_message`;
CREATE TABLE `t_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `messageTitle` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `message` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_message
-- ----------------------------

-- ----------------------------
-- Table structure for t_news
-- ----------------------------
DROP TABLE IF EXISTS `t_news`;
CREATE TABLE `t_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newscentre` varchar(255) DEFAULT NULL,
  `news` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_news
-- ----------------------------
INSERT INTO `t_news` VALUES ('1', 'NewsCentre', '<br>\n·Focus on Asia-pacific market and Promotion in China from 2013.<br><br>\n·High-performance SR control moudle introduced into market in 2012.<br><br>\n·Low Qg and Rdson super juction mosfet introduced into market in 2012.<br><br>\n·Low Rdson trench mosfet introduced into market in 2010.<br><br>\n·⁯\"Ausemi\",establised in CA America in 2009.<br><br>');

-- ----------------------------
-- Table structure for t_overview
-- ----------------------------
DROP TABLE IF EXISTS `t_overview`;
CREATE TABLE `t_overview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `overviewTitle` varchar(255) DEFAULT NULL,
  `overview` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_overview
-- ----------------------------
INSERT INTO `t_overview` VALUES ('1', 'CompanyOverview', 'Ausemi is a fabless semiconductor provider, and consists of  highly experienced and innovative experts focused on power mosfet design and application. \n<br><br>\nTo enable green, high efficient and low cost electric power supply  by creating cutting edge semiconductor products and services, Ausemi supply high-performance products from Super-junction mosfet, VD mosfet, trench mosfet and SR control moudle for power  with our partners factories\'  cooperation  from Malaysia,Taiwan and China mainland,\n<br><br>\nAusemi focused on:<br>\n•enable high quality solutions with experienced and professional R&D team. <br>\n•Provide quick and effective service for customer total satisfaction.<br>\n•Provide reliable product quality with flexible delivery capability. <br>\n•Identify and articulate new market opportunities, encourage innovation\n');

-- ----------------------------
-- Table structure for t_quality
-- ----------------------------
DROP TABLE IF EXISTS `t_quality`;
CREATE TABLE `t_quality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qualityTitle` varchar(255) DEFAULT NULL,
  `quality` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_quality
-- ----------------------------
INSERT INTO `t_quality` VALUES ('1', 'Quality', 'Quality<br>TESTΩ');

-- ----------------------------
-- Table structure for t_srmodule
-- ----------------------------
DROP TABLE IF EXISTS `t_srmodule`;
CREATE TABLE `t_srmodule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `srpartno` varchar(255) DEFAULT NULL,
  `stype` varchar(255) DEFAULT NULL,
  `siout` varchar(255) DEFAULT NULL,
  `svdd` varchar(255) DEFAULT NULL,
  `svgs` varchar(255) DEFAULT NULL,
  `freq` varchar(255) DEFAULT NULL,
  `srProductPackage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_srmodule
-- ----------------------------
INSERT INTO `t_srmodule` VALUES ('1', 'Au9527', 'Flyback/Forward/QR/LLC', '1.5A', '30', '12', '350', 'PDIP4');
INSERT INTO `t_srmodule` VALUES ('2', 'Ω', 'ΩΩ', 'ΩΩΩ', 'ΩΩΩΩ', 'ΩΩΩ', 'ΩΩ', 'Ω');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', 'admin');

-- ----------------------------
-- Table structure for t_vdmosfet
-- ----------------------------
DROP TABLE IF EXISTS `t_vdmosfet`;
CREATE TABLE `t_vdmosfet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vpartNo` varchar(255) DEFAULT NULL,
  `vdescription` varchar(255) DEFAULT NULL,
  `vvdssV` varchar(255) DEFAULT NULL,
  `vvgsV` varchar(255) DEFAULT NULL,
  `vminv` varchar(255) DEFAULT NULL,
  `vmaxv` varchar(255) DEFAULT NULL,
  `vids` varchar(255) DEFAULT NULL,
  `vrds10` varchar(255) DEFAULT NULL,
  `vrds0` varchar(255) DEFAULT NULL,
  `vpd` varchar(255) DEFAULT NULL,
  `vpackage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_vdmosfet
-- ----------------------------
INSERT INTO `t_vdmosfet` VALUES ('1', 'ad', 'df', 'ff', 'f', 'ff', 'ff', 'ff', 'ff', 'ff', 'ff', 'ffffff');
