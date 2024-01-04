import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit{

  searchText: FormControl = new FormControl();
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.searchData = this.searchText;
  }
}
