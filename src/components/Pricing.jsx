import React, { useState } from 'react'
import '../css/price.css'
import { useTranslation } from 'react-i18next';
import axios from 'axios'
const Pricing = () => { 
    return (
        <div class="demo">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="pricingTable">
                            <div class="pricingTable-header">
                                <h3 class="title">BASIC</h3>
                            </div>
                            <div class="pricing-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <ul class="pricing-content">
                                <li>50GB Disk Space</li>
                                <li>50 Email Accounts</li>
                                <li>50GB Bandwidth</li>
                                <li>Maintenance</li>
                                <li>15 Subdomains</li>
                            </ul>
                            <div class="price-value">
                                <span class="amount">$20</span>
                                <span class="duration">/mo</span>
                            </div>
                            <div class="pricingTable-signup">
                                <a href="#">Select</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="pricingTable green">
                            <div class="pricingTable-header">
                                <h3 class="title">Business</h3>
                            </div>
                            <div class="pricing-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <ul class="pricing-content">
                                <li>50GB Disk Space</li>
                                <li>50 Email Accounts</li>
                                <li>50GB Bandwidth</li>
                                <li>Maintenance</li>
                                <li>15 Subdomains</li>
                            </ul>
                            <div class="price-value">
                                <span class="amount">$40</span>
                                <span class="duration">/mo</span>
                            </div>
                            <div class="pricingTable-signup">
                                <a href="#">Select</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="pricingTable blue">
                            <div class="pricingTable-header">
                                <h3 class="title">PREMIUM</h3>
                            </div>
                            <div class="pricing-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <ul class="pricing-content">
                                <li>50GB Disk Space</li>
                                <li>50 Email Accounts</li>
                                <li>50GB Bandwidth</li>
                                <li>Maintenance</li>
                                <li>15 Subdomains</li>
                            </ul>
                            <div class="price-value">
                                <span class="amount">$80</span>
                                <span class="duration">/mo</span>
                            </div>
                            <div class="pricingTable-signup">
                                <a href="#">Select</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing