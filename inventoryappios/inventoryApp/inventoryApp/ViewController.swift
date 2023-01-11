//
//  ViewController.swift
//  inventoryApp
//
//  Created by Bruno Coelho on 11/01/23.
//

import UIKit

class ViewController: UIViewController {
    
    private let mainView = MainView()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        view = mainView
        
        title = "Purple Orchid"

    }


}

